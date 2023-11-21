import React, { useState, useEffect } from "react";
import { ReadCatalog } from "../../db/Read/ReadCatalog";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/loading";
import { Error } from "../Error/Error";
import { StarRating } from "../../components/StarRating/StarRating";
import { Button } from './../../components/Button/Button';
import { CatalogLandingPageQandA } from "./CatalogLandingPageQandA";
import { CourseList } from "../../components/CourseList/CourseList";
import { ReadAllCatalogs } from "../../db/Read/ReadAllCatalogs";

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

    const [isFetchingCatalogs, setIsFetchingCatalogs] = useState(true);
    const [errorCatalogs, setErrorCatalogs] = useState(null);
    const [catalogs, setCatalogs] = useState(null);

    ReadAllCatalogs()
    .then(res => {
        setCatalogs(res.data);
    })
    .catch(err => {
        setErrorCatalogs(err)
    })
    .finally(() => {
        setIsFetchingCatalogs(false)
    });

    if(isFetching)
    {
        return (
            <div className="complete-center">
                <Loading/>            
            </div>
        )
    }
    else if(error)
    {
        return (
            <Error title={`Error retrieving ${name}`} message={"Please check you network connection and try again."}/>
        )
    }
    else
    {
        return (
            <div class="full-height flex-column horizontal-align primary-background padding-top-100">
                <h1 class="color-white font-size-4rem letter-spacing-2px">
                    {data.name}
                </h1>
                <div class="margin-top-10px">
                    <img class="width-30rem" src={require(`../../imgs/${data.name}.png`)} alt={data.name} />
                </div>
                <div class="subtitle-container horizontal-align align-items-center margin-top-15px">
                    <div class="everything-margin background-orange padding-10-15px border-radius-20 margin-right-7">
                        <h2 class="white-text font-size-175">
                            Everything
                        </h2>
                    </div>
                    <h2 class="font-size-19 white-text">
                        you need to pass the {data.name}!
                    </h2>
                </div>
                <div className="flex-row margin-top-15px">
                    <StarRating num={data.starRating}/>
                    <p className="color-white margin-left-5px">{data.starRating}</p>
                </div>
                <div class="catalogLanding-image flex-column align-items-center">
                <div class="flex-column margin-top-150px align-items-center">
                        <Button text={`🛒 Enroll Now - ${data.price}`} func={() => {
                            window.location.href = `catalog/${name}`;
                        }}/>
                        <h2 class="font-size-15 margin-10px-0-15px">or</h2>
                        <h2 class="font-size-15 color-009DBF">Try a few questions first</h2>
                    </div>
                    <div class="catalogLanding-section2 margin-top-25px align-items-center">
                        <div class="flex-column padding-50">
                            <div class="flex-column complete-center max-width-700">
                                <h1 class="font-size-3rem text-align-center">Accurate, Original and Extensive</h1>
                                <div class="background-orange height-3px margin-top-3px text-align-center" />
                            </div>
                            <p class="margin-top-30px font-size-15 text-align-center">Tired of having to cobble together various practice questions from spurious websites that can't be trusted? I have produced this course as a bite-size way to make sure you have the resources to ace your exam.</p>
                        </div>
                    <video className="catalogLanding-video" src={video}></video>
                    </div>
                </div>
                <div class="margin-top-50px">
                    <div class="flex-row">
                    <CatalogLandingPageQandA title={"What you'll receive"} tip={"Extensive"} array={["✅ 140 original questions that accurately reflect the exam", "✅ Personalized training plan to help you practice at your own pace"]} icon={"check"} color={"#61FF67"} />
                    </div>
                    <div class="flex-row">
                    <CatalogLandingPageQandA title={"Who is this for?"} tip={"Target Student"} array={["- Anyone wishing to pass the CPA-21-02 exam", "- Those wishing to boost their career", "- Developers who want to take control of their personal development"]} icon={"user"} color={"#edfe00"} />
                    </div>
                    <div class="flex-row">
                    <CatalogLandingPageQandA title={"Prerequisites"} tip={"What you should know"} array={["Since this is an associate exam, we advise that you have completed the fundamental exam, if it's not a requirement already.", "A basic understanding of the language and its syntax is important for the exam"]} icon={"question-sign"} color={"#ff4545"} />
                    </div>
                </div>
                <div class="catalogLanding-image catalogLanding-section3 flex-column horizontal-align">
                    <h1 class="font-size-3rem margin-top-150px border-bottom-3px-solid-highlight-color max-width-fit-content margin-bottom-10px">See our other courses...</h1>
                    <CourseList error={errorCatalogs} isFetching={isFetchingCatalogs} data={catalogs} />
                </div>
            </div>
        )
    }
}