import React, { useState } from "react";

import { PracticePageQuestion } from "./PracticePageQuestion";
import { QuestionNavigator } from "./QuestionNavigator";
import { PracticeInput } from "./PracticeInput";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Button } from './../../components/Button/Button';

import "../../App.css";
import "./PracticePage.css";


export const QuestionPage = ({data, data2, setKnowledgeAreas, setCorrect, setIncorrect, setSkipped, setFinished}) => {

    //Checkboxes
    const [questionOne, setQuestionOne] = useState(false);
    const [questionTwo, setQuestionTwo] = useState(false);
    const [questionThree, setQuestionThree] = useState(false);
    const [questionFour, setQuestionFour] = useState(false);

    //Question no index
    const [questionNo, setQuestionNo] = useState(1);

    const resetCheckboxes = () => {
        setQuestionOne(false);
        setQuestionTwo(false);
        setQuestionThree(false);
        setQuestionFour(false);
    }

    const CalculateResult = () => {
        //Creating a set of all the knowledge areas
        const knowledgeAreas = new Set([]);
        const answers = JSON.parse(localStorage.getItem("currentExam"));
        data?.detail.map((el, index) => {
            knowledgeAreas.add(el.knowledgeArea);

            //If we can't find a question number saved in the array (skipped)
            const foundElement = answers?.find((item) => item.questionNo === index + 1);

            if(!foundElement){
                setSkipped(skipped => [...skipped, el]);
            }
            //Selected answer is equal to the correct answer
            else if(foundElement.answerX === el.correctAnswer)
            {
                setCorrect(correct => [...correct, el]);
            }
            else{
                setIncorrect(incorrect => [...incorrect, el]);
            }
            //Clear local storage so the answers no longer get stored.
            localStorage.clear();
            return el.answer
        })
        setKnowledgeAreas(knowledgeAreas);
    }

    function timeFormat(remainingTime) {
        return `${Math.floor(remainingTime / 3600).toString().padStart(2, '0')}:${Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0')}:${(remainingTime % 60).toString().padStart(2, '0')}`
    }

    return (
        <div id="catalogpage-entry" className="flex-column page-margin fit-content" style={{marginLeft: "25px"}}>
            <div className="flex-column">
                <div className="flex-row">
                    <QuestionNavigator noOfQuestions={data.detail.length} setQuestionNo={setQuestionNo} questionNo={questionNo}/>
                    <div className="question-container">
                        <PracticePageQuestion question={data.detail[questionNo - 1].question} language={data.detail.catagory}/>
                        <PracticeInput reset={resetCheckboxes} questionHook={questionOne} setQuestionHook={setQuestionOne} questionNo={questionNo} answerX={data.detail[questionNo - 1].answerOne} language={data.detail.language}/>
                        <PracticeInput reset={resetCheckboxes} questionHook={questionTwo} setQuestionHook={setQuestionTwo} questionNo={questionNo} answerX={data.detail[questionNo - 1].answerTwo} language={data.detail.language}/>
                        <PracticeInput reset={resetCheckboxes} questionHook={questionThree} setQuestionHook={setQuestionThree} questionNo={questionNo} answerX={data.detail[questionNo - 1].answerThree} language={data.detail.language}/>
                        <PracticeInput reset={resetCheckboxes} questionHook={questionFour} setQuestionHook={setQuestionFour} questionNo={questionNo} answerX={data.detail[questionNo - 1].answerFour} language={data.detail.language}/>

                        <div className="flex-row" style={{marginTop: "10px"}}>
                            {
                                questionNo !== 1 ? (
                                    <div className="practiceButton-container">
                                        <Button text={"Back"} func={() => {   
                                            setQuestionNo(questionNo-1);
                                            resetCheckboxes();
                                        }}
                                        />
                                    </div>

                                ) : (
                                    <></>
                                )
                            }
                            {
                                questionNo !== data.detail.length ? (
                                    <div className="practiceButton-container">
                                        <Button text={"Next"} func={() => {   
                                            setQuestionNo(questionNo+1);
                                            resetCheckboxes();
                                        }}
                                        />
                                    </div>
                                ) : (
                                    <div className="practiceButton-container">
                                        <Button text={"Finish"} func={() => {   
                                            setFinished(true);;
                                            CalculateResult();
                                        }}
                                        />
                                    </div>
                                )
                            }
                        </div>                                       
                    </div>
                    <div className="timer-container">
                        <CountdownCircleTimer
                            isPlaying
                            duration={data2.detail[0].time * 60}
                            colors={['#4cff00', '#ffa500', '#ff0000']}
                            colorsTime={[(data2.detail[0].time * 60) / 2, (data2.detail[0].time * 60) / 4, 0]}
                            size={100}
                        >
                            {({ remainingTime }) => timeFormat(remainingTime)}

                        </CountdownCircleTimer>
                    </div>
                </div>
            </div>
        </div>
    )
}