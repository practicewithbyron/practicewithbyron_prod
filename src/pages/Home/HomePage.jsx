import React, { useState, useEffect } from "react";
import { Loading } from "../Loading/loading";
import { HomeWidget } from "./HomeWidget";
import { HomeWidget2 } from "./HomeWidget2";
import { WidgetComponent } from '../../components/Widget/WidgetComponent';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReadAllCatalogs } from "../../db/Read/ReadAllCatalogs";
import { Header } from "./Header/Header";

import "./HomePage.css";
import "../../App.css";
import ErrorFace from "../Error/ErrorFace";

export const Home = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        ReadAllCatalogs()
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setIsFetching(false)
        });
    }, [])
  

    return(
        <>
            <Header/>
            <div className="center-text center-content flex-column introduction">
                <h2 className="title-text subtitle fit-content">
                    Hi, I'm Byron Lloyd - Wakeman
                </h2>
                <p className="fit-content paragraph">
                    Are you feeling stuck or uneasy about taking an accreditation? <br/>
                    Don't worry, together we'll make sure you ace your exam.
                </p>
                <ul className="facts">
                    <li>
                        <span className="fact">
                            10+
                        </span>
                        Years of experience
                    </li>
                    <li>
                        <span className="fact">
                            1000+
                        </span>
                        Developers taught
                    </li>
                    <li>
                        <span className="fact">
                            4
                        </span>
                        Accreditation courses
                    </li>
                </ul>
            </div>
            <div className="center-text center-content flex-column introduction">
                <div className="color-text">Why practice with byron?</div>
                <h2 className="title-text subtitle fit-content" style={{margin: 0}}>
                    Practice makes perfect
                </h2>
            </div>
            <HomeWidget subtext={'Hundreds of questions'} 
                title={'Practice exams that will make you ready'} 
                paragraph={`For programming exams, quality practice is crucial. Our exams are expertly designed to fully prepare you with a wide range of comprehensive questions covering all essential topics, ensuring you study the right material for success.`}
                img="homeImg1.png"/>
            <HomeWidget2 subtext={`Fast track your practice`} 
                title={`Master your Exams with Our Comprehensive Question Bank`} 
                paragraph={`Refine your coding skills with our extensive collection of unique practice questions and detailed explanations. Our question bank covers everything you need to know to ace your programming exams, making it the perfect tool to achieve your career goals.`}
                img="homeImg2.png"/>
            <div style={{marginTop: "90px"}}>
                <HomeWidget subtext={'Expertly Crafted'} 
                    title={'High quality challenging questions '} 
                    paragraph={`our questions are challenging, so you'll be fully prepared for the difficulty level of the actual exam. With our practice exams, you'll be ready to ace your programming certification and take your career to the next level.`}
                    img="homeImg3.png"/>
            </div>
            <div className="center-content flex-column" style={{background: "white", paddingBottom: "100px"}}>
                <h1 className="subtitle title-text">
                    Top-Selling Practice Exams
                </h1>
                {   
                    error ? (
                        <div className="flex-column center-text ">
                            <ErrorFace/>
                            <div className="homePageErrorMessage-container">
                                <h2 className="paragraph">
                                    Sorry, there seems to be a problem.
                                </h2>
                                <h2 className="paragraph">
                                    Please check your internet connection
                                </h2>
                            </div>

                        </div>
                    ) : (                
                        <div className="homePageCatalog-container">
                            {
                            !isFetching ? (
                                data?.detail.map(el => {
                                    return(
                                        <div style={{margin: "10px 10px"}}>
                                            <Link to={`/catalog/${el.name}`}>
                                                <WidgetComponent img={`${el.name}.png`} text={el.name} desc={el.shortDescription} price={el.price} difficulty={el.difficulty} starRating={el.starRating}/>
                                            </Link>
                                        </div>
                                    )  
                                })
                                ) : (
                                    <Loading/>
                                )
                            }
                        </div>
                    )
                }
                {
                    !error ? (
                        <NavLink to="/catalog">
                            <div className="button">
                                See more
                            </div>
                        </NavLink>
                    ) : (<></>)
                }

            </div>
        </>
    )
}