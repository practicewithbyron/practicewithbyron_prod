import React from "react";
import ErrorFace from "../../pages/Error/ErrorFace";
import { WidgetComponent } from "../Widget/WidgetComponent";
import { Loading } from "../../pages/Loading/loading";
import { Link } from "react-router-dom";

import "../../App.css";
import "./CourseList.css";

export const CourseList = ({error, isFetching, data}) => {
    return (
        <>
            {   
                error ? (
                    <div className="flex-column center-text ">
                        <ErrorFace/>
                        <div className="courseListErrorMessage-container">
                            <h2 className="paragraph">
                                Sorry, there seems to be a problem.
                            </h2>
                            <h2 className="paragraph">
                                Please check your internet connection
                            </h2>
                        </div>

                    </div>
                ) : (                
                    <div className="courseListCatalog-container">
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
        </>
    )
}