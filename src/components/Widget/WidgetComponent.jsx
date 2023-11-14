import React from "react";
import "../../App.css";
import "./WidgetComponent.css";
import { StarRating } from "../StarRating/StarRating";
import { difficultyClassName } from "./difficultyClassName";

export const WidgetComponent = ({img, text, desc, price, difficulty, starRating}) => {
    return (
        <div className="flex-column widget-component">
            <div className="widgetComponentImage-container">
                <img src={require(`../../imgs/${img}`)} className="widgetComponent-image" alt={img}></img>
            </div>
            <div className="widgetComponentText-container">
                <p className={`widgetComponent-difficulty ${difficultyClassName(difficulty)}`}>{difficulty}</p>
                <h3 className="widgetComponent-header">{ text }</h3>
                <p className="widgetComponent-desc center-text">{ desc }</p>
                <div className="flex-row" style={{marginTop: "15px"}}>
                    <h1 className="widgetComponent-header">
                        £14.99
                    </h1>
                    <div className="widgetComponentStarRating-container">
                        <StarRating num={starRating}/>
                    </div>
                </div>
            </div>
        </div>
    )
}