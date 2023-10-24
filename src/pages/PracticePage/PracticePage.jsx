import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/loading";
import { ReadAllCatalogQuestions } from "../../db/Read/ReadAllCatalogQuestions";
import { PracticeInput } from "./PracticeInput";
import { ReadCatalog } from "../../db/Read/ReadCatalog";
import { Link } from "react-router-dom";
import { MyChart} from "./PracticeChart";
import { PracticePercentageBar } from "./PracticePercentageBar";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { DisabledInput } from "./DisabledInput";
import { QuestionNavigator } from "./QuestionNavigator";
import { Button } from './../../components/Button/Button';
import { PracticePageQuestion } from "./PracticePageQuestion";

import Cookies from "js-cookie";

import "../../App.css";
import "./PracticePage.css";
import { IsLoggedIn } from "../../IsLoggedIn";


function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if(minutes){
        return `${hours} hour${hours === 1 ? "" : "s"} and ${minutes} minutes`;
    }
    else{
        return `${hours} Hours`;
    }
}

function timeFormat(remainingTime) {
    return `${Math.floor(remainingTime / 3600).toString().padStart(2, '0')}:${Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0')}:${(remainingTime % 60).toString().padStart(2, '0')}`
}

export const PracticePage = () => {
    //Page states
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [reviewQuestions, setReviewQuestions] = useState(false);

    //ReadAllCatalogQuestions
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    //ReadCatalog
    const [isFetching2, setIsFetching2] = useState(true);
    const [error2, setError2] = useState(false);
    const [data2, setData2] = useState(false);

    //Checkboxes
    const [questionOne, setQuestionOne] = useState(false);
    const [questionTwo, setQuestionTwo] = useState(false);
    const [questionThree, setQuestionThree] = useState(false);
    const [questionFour, setQuestionFour] = useState(false);

    const resetCheckboxes = () => {
        setQuestionOne(false);
        setQuestionTwo(false);
        setQuestionThree(false);
        setQuestionFour(false);
    }

    const [knowledgeAreas, setKnowledgeAreas] = useState(null);
    const [correct, setCorrect] = useState([]);
    const [incorrect, setIncorrect] = useState([]);
    const [skipped, setSkipped] = useState([]);

    const {name} = useParams(); 

    const [questionNo, setQuestionNo] = useState(1);

    // localStorage.clear();
    // console.log(localStorage);

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

    
    if(isFetching){
        IsLoggedIn(`practice/${name}`);
        const tokenFromCookie = Cookies.get('jwtToken');
        // If there are cookies from a previous exam and they haven't expired
        ReadAllCatalogQuestions(name, tokenFromCookie)
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setIsFetching(false)
        });  
        
    }

    if(isFetching2){
        ReadCatalog(name)
        .then(res => {
            setData2(res.data);
        })
        .catch(err => {
            setError2(err)
        })
        .finally(() => {
            setIsFetching2(false)
        }); 
    }
        
    if(error || error2){
        return <h1>Error</h1>
    }
    else if(isFetching || isFetching2){
        return (
            <Loading/>
        )
    }
    else{
        if(started){
            if(!finished){
                return(
                    <>
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
                        {/* <QuestionPage data={data}/> */}
                    </>
                )
            }
            else{
                if(!reviewQuestions)
                {
                    return(
                        <div id="catalogpage-entry" className="flex-column center-content page-margin center-content" style={{marginLeft: "50px"}}>
                            <h1 className="practicePage-title">{name} Results</h1>
                            <MyChart correct={correct.length} incorrect={incorrect.length} skipped={skipped.length} 
                                passPercentage={data2.detail[0].passPercentage} setReviewQuestions={setReviewQuestions}/>
                            <h2 style={{margin: "20px 0 10px 0"}}>Knowledge Areas</h2>
                            {Array.from(knowledgeAreas)?.map(el => (
                                <div className="practicePageKnowledgeArea-title">
                                    <h4>{el}</h4>
                                    <PracticePercentageBar correct={correct.length} incorrect={incorrect.length} skipped={skipped.length}/>
                                </div>
                            ))}
                                <div className="flex-row practicePageButton-container">
                                    <div style={{margin: "0px 10px", minWidth: "200px"}}>
                                        <Button text="Retry exam" func={() => {
                                            window.location.reload();
                                        }}/>
                                    </div>
                    
                                    <div style={{margin: "0px 10px", minWidth: "200px"}}>
                                        <Button text="Back to dashboard" func={() => {
                                            window.location.href="/dashboard";
                                        }}/>
                                    </div>

                                </div>
                        </div>
                    )
                }
                else{
                    return(
                        <div id="catalogpage-entry" className="flex-column center-content page-margin center-content" style={{marginLeft: "50px"}}>
                            <h1 style={{marginBottom: "20px"}}>{name} Results</h1>
                            {
                                data.detail.map((el, index) => {
                                   return(
                                    <div style={{margin: "10px 0"}}>
                                        <h3>Question {index + 1}</h3>
                                        <h3>{el.question}</h3>
                                        <DisabledInput answer={el.answerOne} selected={el.answerOne === el.answer} isCorrect={el.answerOne === el.correctAnswer} language={data.detail.language}/>
                                        <DisabledInput answer={el.answerTwo} selected={el.answerTwo === el.answer} isCorrect={el.answerTwo === el.correctAnswer} language={data.detail.language}/>
                                        <DisabledInput answer={el.answerThree} selected={el.answerThree === el.answer} isCorrect={el.answerThree === el.correctAnswer} language={data.detail.language}/>
                                        <DisabledInput answer={el.answerFour} selected={el.answerFour === el.answer} isCorrect={el.answerFour === el.correctAnswer} language={data.detail.language}/>
                                        <h3>
                                            Explanation
                                        </h3>
                                        <h4>
                                            {el.explanation}
                                        </h4>
                                    </div>
                                   )
                                })
                            }  
                            {/* <button style={{maxWidth: "250px", margin: "10px 0"}} className="startButton" onClick={() => {
                                setReviewQuestions(false);
                            }}>Review knowledge areas</button>  */}

                            <Button text="Review knowledge areas" func={() => {
                                setReviewQuestions(false)
                            }}/>
                        </div>
                    )
                }
            }

        }
        else{
            return(
                <>
                    <div id="catalogpage-entry" className="flex-column center-content page-margin fit-content practiceIntro-container">
                        <h2 className="fit-content title">{name}</h2>
                        <div className="flex-row practiceStat-container">
                            <h3 className="fit-content">{data.detail.length} questions</h3>
                            <h3 className="fit-content" style={{margin: "0 2vw"}}>|</h3>
                            <h3 className="fit-content">{toHoursAndMinutes(data2.detail[0].time)}</h3>
                            <h3 className="fit-content" style={{margin: "0 2vw"}}>|</h3>
                            <h3 className="fit-content">{data2.detail[0].passPercentage}% correct required to pass</h3>
                        </div>
                        <p className="description practiceDescription-container">
                            {data2.detail[0].description}
                        </p>
                        <div className="flex-row">
                            <div className="button-container">
                                {
                                    localStorage.getItem("currentExam") ? (
                                        <Button text={"Continue Exam"} func={() => {setStarted(true)}}/>
                                    ) : (
                                        <Button text={"Start exam"} func={() => {setStarted(true)}}/>
                                    )
                                }
                            </div>
                            <div className="button-container">
                                <Link to={"/stats/" + name}>
                                    <Button text={"View Stats"} func={() => {}}/>
                                </Link>
                            </div>
                            <div className="button-container">
                                <Link to={"/training"}>
                                    <Button text={"Practice for Exam"} func={() => {}}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}