import React, { useState } from "react";
import { ReadCatalog } from "../../db/Read/ReadCatalog";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/loading";
import { Link } from "react-router-dom";
import { Error } from "../Error/Error";
import { CourseOverview } from './CourseOverview';
import { StarRating } from "../../components/StarRating/StarRating";
import { Button } from './../../components/Button/Button';

import "./CatalogLandingPage.css";
import "../../App.css";
import { CatalogLandingPageQandA } from "./CatalogLandingPageQandA";
import { difficultyClassName } from "../../components/Widget/difficultyClassName";



export const CatalogLandingPage = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const {name} = useParams(); 

    if(isFetching){
        ReadCatalog(name)
        .then(res => {
            setData(res.data.detail[0]);
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setIsFetching(false)
        });  
    }

    if(isFetching){
        return(
            <Loading/>
        )
    }
    if(error)
    {
        return(
            <Error title={"Internal server error"} message={error.message}/>
        )
    }
    else if (data){
        return (
            <div className="flex-column">
                <div className="catalogLanding-page center-text flex-row">
                    <div className="catalogLandingHead-container flex-column">
                        <p className={`widgetComponent-difficulty ${difficultyClassName(data.difficulty)}`}>{data.difficulty}</p>
                        <h1 className="catalogLanding-title">
                            {data.name}
                        </h1>
                        <h2 className="catalogLanding-subtitle">
                            {data.shortDescription}
                        </h2>
                        <div className="catalogLandingPageStarRating-container">
                            <StarRating num={data.starRating}/>
                        </div>
                        <Button text="🛒 Enroll in Course" func={() => {window.location.href = `/payment/${name}`}}/>
                    </div>
                    <div className="catalogLandingContent-container textAlign-left flex-column">
                        <CourseOvervisiew difficulty={data.difficulty} noOfQuestions={140}/>
                    </div>
                </div>
                <div className="flex-column catalogLandingPageDescription-container">
                    <h1 className="catalogLandingPageDescription catalogLandingPageDescription-title">Accurate, Original and Extensive</h1>
                    <h4 className="catalogLandingPageDescription catalogLandingPageDescription-text">
                        Tired of having to cobble together various practice questions from spureous website which can't be trusted?
                        I have produced this course as a bite-size way to make sure you have the resources to ace your exam.
                    </h4>
                    <video className="catalogLandingPageDescription-video" controls>
                        <source src={""} type="video/mp4"/>
                    </video>
                </div>
                <div className="flex-column catalogLandingPageQandA-container">
                    <CatalogLandingPageQandA title={"What you'll recieve"} tip={"Extensive"} array={["✅ 140 original questions that accurately reflect the exam", "✅ Personalised training plan to make help you practice at your own pace"]} icon={"check"} color={"#10c737"}/>
                    <CatalogLandingPageQandA title={"Who is this for?"} tip={"Target Student"} array={[`- Anyone wishing to pass the ${data.name} exam`, " - Those wishing to boost their career", "- Developers who want to take control of their personal development"]} icon={"user"} color={"#A00FF0"}/>
                    <CatalogLandingPageQandA title={"Prerequisites"} tip={"What you should know"} array={["Since this is an associate exam we advise that you have completed the fundamental exam, if it's not a requierment already."]} icon={"question-sign"} color={"#e49205"}/>
                </div>
            </div>

        )
    }
}