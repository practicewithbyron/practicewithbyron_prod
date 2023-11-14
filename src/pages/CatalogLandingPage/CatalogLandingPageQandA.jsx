import React from "react";

import "./CatalogLandingPage.css";
import "./CatalogLandingPageQandA.css";
import "../../App.css";

export const CatalogLandingPageQandA = ({tip, icon, color, title, array}) => {
    return (
        <div className="catalogLandingPageQandA-container">
            <div className="catalogLandingPageQandAIcon-container">
                <div style={{color: `${color}`}} className={`glyphicon glyphicon-${icon} catalogLandingPageQandA-icon`}/>
            </div>
            <div className="catalogLandingPageQandATip-container">
                <p className="catalogLandingPageQandA-tip" style={{color: `${color}`}}>{tip}</p>
            </div>
            <h1 className="catalogLandingPageQandA-title">{title}</h1>
            {
                array.map(el => {
                    return (
                        <div className="catalogLandingPageQandATitle-container">
                            <p className="catalogLandingPageDescription-text">{el}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}