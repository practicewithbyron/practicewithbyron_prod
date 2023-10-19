import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/loading";
import { ReadAllCatalogQuestions } from "../../db/Read/ReadAllCatalogQuestions";
import { ReadCatalog } from "../../db/Read/ReadCatalog";
import { MyChart} from "./PracticeChart";
import { PracticePercentageBar } from "./PracticePercentageBar";
import { DisabledInput } from "./DisabledInput";
import { Button } from './../../components/Button/Button';
import { QuestionPage } from "./QuestionPage";

import Cookies from "js-cookie";

import "../../App.css";
import "./PracticePage.css";
import { PracticeLandingPage } from "./PracticeLandingPage";


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

    //Results
    const [knowledgeAreas, setKnowledgeAreas] = useState(null);
    const [correct, setCorrect] = useState([]);
    const [incorrect, setIncorrect] = useState([]);
    const [skipped, setSkipped] = useState([]);

    const {name} = useParams(); 

    
    if(isFetching){
        const tokenFromCookie = Cookies.get('jwtToken');
        if(!tokenFromCookie)
        {
            window.location.href = "/login"
        }
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
                    <QuestionPage 
                        data={data}
                        data2={data2}
                        setKnowledgeAreas={setKnowledgeAreas} 
                        setCorrect={setCorrect} 
                        setIncorrect={setIncorrect} 
                        setSkipped={setSkipped}
                        setFinished={setFinished}
                    />
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
                <PracticeLandingPage data={data} data2={data2} setStarted={setStarted} name={name}/>
            )
        }
    }
}