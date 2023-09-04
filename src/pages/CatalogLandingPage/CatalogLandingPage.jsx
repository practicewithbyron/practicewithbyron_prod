import React, { useState } from "react";
import { ReadCatalog } from "../../db/Read/ReadCatalog";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/loading";
import { CatalogLandingPageStatItem } from "./CatalogLandingPageStatItem";
import { Link } from "react-router-dom";

import "./CatalogLandingPage.css";
import "../../App.css";
import { Error } from "../Error/Error";

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
            <div className="catalogLanding-page center-text">
                <div className="catalogLandingHead-container">
                    <h1 className="catalogLanding-title">
                        {data.name}
                    </h1>
                    <h2 className="catalogLanding-subtitle">
                        {data.shortDescription}
                    </h2>
                    <Link to={`/payment/${name}`}>
                        <div className="catalogLanding-button fit-content complete-center hoverElement">
                            🛒 Enroll in Course
                        </div>
                    </Link>

                </div>

                <div className="catalogLandingContent-container flex-row">
                    <div className="catalogLandingDesc-container flex-column" >
                        <h2 className="bold" style={{marginBottom: "25px"}}>
                            {data.name}: An {data.shortDescription}
                        </h2>
                        <p style={{textAlign: "left"}}>
                            {data.description}
                        </p>
                    </div>
                    <div className="catalogLandingStats-container flex-column">
                      <CatalogLandingPageStatItem text="Intermediate" img="glyphicon glyphicon-stats"/>  
                      <CatalogLandingPageStatItem text="Lifetime Access" img="glyphicon glyphicon-bell"/>  
                      <CatalogLandingPageStatItem text="140 Questions" img="glyphicon glyphicon-question-sign"/>  
                    </div>
                </div>
            </div>
        )
    }
}