import React from "react";
import "../../App.css";
import "./CatalogLandingPage.css";

export const CatalogLandingPageStatItem = ({img, text}) => {
    return(
        <div className="flex-row catalogLandingPageStatItem-container">
            <div className={`${img} catalogLandingPageStatItem-icon`}/>
            <h3 className="catalogLandingPageStatItem-text"><b>{text}</b></h3>
        </div>
    )
}