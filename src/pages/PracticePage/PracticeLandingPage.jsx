import React from "react";

import { Button } from './../../components/Button/Button';
import { Link } from "react-router-dom";


export const PracticeLandingPage = ({data, data2, setStarted, name}) => {

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

    return (
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