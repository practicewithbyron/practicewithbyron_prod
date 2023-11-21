import React, { useState } from "react";
import { ReadCatalog } from "../../db/Read/ReadCatalog";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/loading";
import { Error } from "../Error/Error";
import { CourseOverview } from './CourseOverview';
import { StarRating } from "../../components/StarRating/StarRating";
import { Button } from './../../components/Button/Button';
import { CatalogLandingPageQandA } from "./CatalogLandingPageQandA";
import { CourseList } from "../../components/CourseList/CourseList";

import video from "../../vids/testvid.mp4";

import "./CatalogLandingPage.css";
import "../../App.css";


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

    return (
        <div class="full-height flex-column horizontal-align primary-background padding-top-100">
            <h1 class="color-white font-size-4rem letter-spacing-2px">
                CPA-21-02
            </h1>
            <div class="margin-top-10px">
                <img class="width-30rem" src={require("../../imgs/CPA-21-02.png")} alt="CPA-21-01" />
            </div>
            <div class="flex-row horizontal-align align-items-center margin-top-15px">
                <div class="background-orange padding-10-15px border-radius-20 margin-right-7">
                <h2 class="white-text font-size-175">
                    Everything
                </h2>
                </div>
                <h2 class="font-size-19 white-text">
                    you need to pass the CPA-21-01!
                </h2>
            </div>
            <div class="catalogLanding-image flex-column align-items-center">
                <div class="flex-column margin-top-150px align-items-center">
                    <Button text="🛒 Enroll Now - $14.99" func={() => {
                        window.location.href = `catalog/${name}`;
                    }}/>
                    <h2 class="font-size-15 margin-10px-0-15px">or</h2>
                    <h2 class="font-size-15 color-009DBF">Try a few questions first</h2>
                </div>
                <div class="flex-row margin-top-25px align-items-center">
                    <div class="flex-column max-width-50 padding-50">
                        <div class="flex-column max-width-700">
                            <h1 class="font-size-3rem text-align-center">Accurate, Original and Extensive</h1>
                            <div class="background-orange height-3px margin-top-3px text-align-center" />
                        </div>
                        <p class="margin-top-30px font-size-15 text-align-center">Tired of having to cobble together various practice questions from spurious websites that can't be trusted? I have produced this course as a bite-size way to make sure you have the resources to ace your exam.</p>
                    </div>
                <video src={video} width="50%" class="padding-50"></video>
                </div>
            </div>
            <div class="margin-top-50px">
                <div class="flex-row">
                <CatalogLandingPageQandA class="font-size-15" title={"What you'll receive"} tip={"Extensive"} array={["✅ 140 original questions that accurately reflect the exam", "✅ Personalized training plan to help you practice at your own pace"]} icon={"check"} color={"#61FF67"} />
                </div>
                <div class="flex-row">
                <CatalogLandingPageQandA class="font-size-15" title={"Who is this for?"} tip={"Target Student"} array={["- Anyone wishing to pass the CPA-21-02 exam", "- Those wishing to boost their career", "- Developers who want to take control of their personal development"]} icon={"user"} color={"#edfe00"} />
                </div>
                <div class="flex-row">
                <CatalogLandingPageQandA class="font-size-15" title={"Prerequisites"} tip={"What you should know"} array={["Since this is an associate exam, we advise that you have completed the fundamental exam, if it's not a requirement already.", "A basic understanding of the language and its syntax is important for the exam"]} icon={"question-sign"} color={"#ff4545"} />
                </div>
            </div>
            <div class="catalogLanding-image flex-column horizontal-align">
                <h1 class="font-size-3rem margin-top-150px border-bottom-3px-solid-highlight-color max-width-fit-content">See our other courses...</h1>
                <CourseList error={{}} isFetching={true} data={data} />
            </div>
        </div>
    )

    // if(isFetching){
    //     return(
    //         <Loading/>
    //     )
    // }
    // if(error)
    // {
    //     return(
    //         <Error title={"Internal server error"} message={error.message}/>
    //     )
    // }
    // else if (data){
    //     return (
    //         <div className="flex-column background">
    //             <div className="catalogLanding-page center-text flex-row">
    //                 <div className="catalogLandingHead-container flex-column">
    //                     <p className={`widgetComponent-difficulty ${difficultyClassName(data.difficulty)}`}>{data.difficulty}</p>
    //                     <h1 className="catalogLanding-title">
    //                         {data.name}
    //                     </h1>
    //                     <h2 className="catalogLanding-subtitle">
    //                         Everything you need to pass the {data.name} exam!
    //                     </h2>
    //                     <img className="catalogLandingPageCatalog-img" src={require(`../../imgs/${data.name}.png`)}/>
    //                     <div className="catalogLandingPageStarRating-container flex-row">
    //                         <h2 className="catalogLandingPageRating-text">4.7</h2>
    //                         <StarRating num={data.starRating}/>
    //                         <h2 className="catalogLandingPageRating-text">312 Reviews</h2>
    //                     </div>
    //                     <Button text="🛒 Enroll in Course" func={() => {window.location.href = `/payment/${name}`}}/>
    //                 </div>
    //                 <div className="catalogLandingContent-container textAlign-left flex-column">
    //                     <CourseOverview difficulty={data.difficulty} noOfQuestions={140}/>
    //                 </div>
    //             </div>
    //             <div className="flex-column catalogLandingPageDescription-container">
    //                 <h1 className="catalogLandingPageDescription catalogLandingPageDescription-title">Accurate, Original and Extensive</h1>
    //                 <h4 className="catalogLandingPageDescription catalogLandingPageDescription-text">
    //                     Tired of having to cobble together various practice questions from spureous website which can't be trusted?
    //                     I have produced this course as a bite-size way to make sure you have the resources to ace your exam.
    //                 </h4>
    //                 <video className="catalogLandingPageDescription-video" controls>
    //                     <source src={""} type="video/mp4"/>
    //                 </video>
    //             </div>
    //             <div className="flex-column catalogLandingPageQandA-container">
                    // <CatalogLandingPageQandA title={"What you'll recieve"} tip={"Extensive"} array={["✅ 140 original questions that accurately reflect the exam", "✅ Personalised training plan to make help you practice at your own pace"]} icon={"check"} color={"#10c737"}/>
                    // <CatalogLandingPageQandA title={"Who is this for?"} tip={"Target Student"} array={[`- Anyone wishing to pass the ${data.name} exam`, " - Those wishing to boost their career", "- Developers who want to take control of their personal development"]} icon={"user"} color={"#A00FF0"}/>
                    // <CatalogLandingPageQandA title={"Prerequisites"} tip={"What you should know"} array={["Since this is an associate exam we advise that you have completed the fundamental exam, if it's not a requierment already."]} icon={"question-sign"} color={"#e49205"}/>
    //             </div>
    //         </div>

    //     )
    // }
}