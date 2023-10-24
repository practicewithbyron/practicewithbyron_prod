import React, { useState, useEffect } from "react";
import { Button } from './../../components/Button/Button';
import { IsLoggedIn } from "../../IsLoggedIn";

import "./TrainingPage.css";
import "../../App.css";

export const TrainingPage = () => {

    const [selectionLive, setSelectionLive] = useState(true);

    // const [isFetching, setIsFetching] = useState(true);
    // const [error, setError] = useState(null);
    // const [data, setData] = useState(null);

    // if(isFetching){
    //     const tokenFromCookie = Cookies.get('jwtToken');
    //     if(!tokenFromCookie){
    //         window.location.href = "/login"
    //     }
    //     ReadAllCatalogQuestions(name, Cookies.get('jwtToken'))
    //     .then(res => {
    //         setData(res.data);
    //     })
    //     .catch(err => {
    //         setError(err)
    //     })
    //     .finally(() => {
    //         setIsFetching(false)
    //     });  
    // }

    useEffect(() => {
        IsLoggedIn("training");
    }, [])

    // Logic to get the questions that we need and then navigate the user to the questions page.

    return (
        <div className="center-text center-content flex-column full-height">
            {
                selectionLive ? (
                    <div className="trainingTest-container">
                        <h1 className="trainingTest-title">Training Test</h1>
                        <div className="flex-row trainingTestSelect-row">
                            <p>Questions</p>
                            <select className="trainingTest-select">
                                <option>All questions</option>
                                <option>Incorrect questions</option>
                                <option>Unanswered questions</option>
                            </select>
                        </div>
                        <div className="flex-row trainingTestSelect-row">
                            <p>Knowledge Area</p>
                            <select className="trainingTest-select">
                                <option>All knowledge areas</option>
                                <option>Pointers</option>
                                <option>Standard Library</option>
                            </select>
                        </div>
                        <div className="flex-row trainingTestSelect-row">
                            <p>Time</p>
                            <input type="time" className="trainingPageTime-input"/>
                        </div>
                        <Button text="Start Training Exam" func={() => {setSelectionLive(false)}}/>
                    </div>
                ) : (
                    <>
                    </>
                )
            }

        </div>
        
    )
}