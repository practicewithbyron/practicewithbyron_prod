import React, { useState } from "react";
import { ReadCatalog } from "../../db/Read/ReadCatalog";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/loading";
import { Error } from "../Error/Error";
import { CourseOverview } from './CourseOverview';
import { StarRating } from "../../components/StarRating/StarRating";
import { Button } from './../../components/Button/Button';
import { CatalogLandingPageQandA } from "./CatalogLandingPageQandA";
import { difficultyClassName } from "../../components/Widget/difficultyClassName";
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
        <div style={{paddingTop: "100px"}} className="flex-column horizontal-align full-height primary-background">
            <div style={{}}>
                <h1 style={{fontSize: "4rem", letterSpacing: "2px"}} className="white-text">
                    CPA-21-02
                </h1>
            </div>
            <div style={{marginTop: "10px"}}>
                <img style={{width: "30rem"}} src={require("../../imgs/CPA-21-02.png")} alt="CPA-21-01" />
            </div>
            <div className="flex-row" style={{alignItems: "center", marginTop: "15px"}}>
                <div style={{backgroundColor: "#EE9D00", padding: "10px 15px", borderRadius: "20px", marginRight: "7px"}}>
                    <h2 style={{color: "white", fontSize: "1.75rem"}}>
                        Everything
                    </h2>
                </div>
                <h2 style={{fontSize: "1.9rem", color: "white"}}>
                    you need to pass the CPA-21-01 exam!
                </h2>
            </div>
            <div className="catalogLanding-image flex-column" style={{display: "flex", alignItems: "center"}}>
                <div className="flex-column" style={{marginTop: "150px", alignItems: "center"}}>
                    <button className="primary-background" style={{border: 0, padding: "10px", color: "white", fontSize: "1.5rem", borderRadius: "25px"}}>🛒 Enroll Now - $14.99</button>
                    <h2 style={{fontSize: "1.5rem", margin: "10px 0 15px 0"}}>or</h2>
                    <h2 style={{fontSize: "1.5rem", color: "#009DBF"}}>Try a few questions first</h2>
                </div>
                <div className="flex-row" style={{marginTop: "25px", alignItems: "center"}}>
                    <div className="flex-column" style={{maxWidth: "50%", padding: "50px"}}>
                        <div className="flex-column" style={{maxWidth: "700px"}}>
                            <h1 style={{fontSize: "3rem", textAlign: "center"}}>Accurate, Original and Extensive</h1>
                            <div style={{backgroundColor: "#EE9D00", height: "3px", marginTop: "3px", textAlign: "center"}}/>
                        </div>
                        <p style={{marginTop: "30px", fontSize: "1.5rem", textAlign: "center"}}>Tired of having to cobble together various practice questions from spureous website which can't be trusted? I have produced this course as a bite-size way to make sure you have the resources to ace your exam.</p>
                    </div>
                    <video src={video} width="50%" style={{padding: "50px"}}></video>
                </div>           
            </div>
            <div style={{marginTop: "50px"}}>
                <div className="flex-row">
                    <CatalogLandingPageQandA title={"What you'll recieve"} tip={"Extensive"} array={["✅ 140 original questions that accurately reflect the exam", "✅ Personalised training plan to make help you practice at your own pace"]} icon={"check"} color={"#61FF67"}/>
                </div>
                <div className="flex-row">
                    <CatalogLandingPageQandA title={"Who is this for?"} tip={"Target Student"} array={[`- Anyone wishing to pass the CPA-21-02 exam`, " - Those wishing to boost their career", "- Developers who want to take control of their personal development"]} icon={"user"} color={"#edfe00"}/>
                </div>
                <div className="flex-row">
                    <CatalogLandingPageQandA title={"Prerequisites"} tip={"What you should know"} array={["Since this is an associate exam we advise that you have completed the fundamental exam, if it's not a requierment already.", "A basic understanding of the language and it's syntax is important for the exam"] } icon={"question-sign"} color={"#ff4545"}/>            
                </div>
            </div>
            <div className="catalogLanding-image flex-column horizontal-align">
                <h1 style={{fontSize: "3rem", marginTop: "150px", borderBottom: "3px solid var(--highlight-color)", maxWidth: "fit-content"}}>See our other courses...</h1>
                <CourseList error={{}} isFetching={true} data={{}}/>
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