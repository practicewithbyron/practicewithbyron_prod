import React from "react";
import { StarRating } from "../StarRating/StarRating";
import { difficultyClassName } from "./difficultyClassName";
import "../../App.css";
import "./WidgetComponent.css";


export const WidgetComponent = ({img, text, desc, price, difficulty, starRating, purchased=false}) => {
    return (
        <div className="flex-column widget-component">
            <div className="widgetComponentImage-container">
                <img src={require(`../../imgs/${img}`)} className="widgetComponent-image" alt={img}></img>
            </div>
            <div className="widgetComponentText-container">
                <div className="flex-row">
                    <p className={`widgetComponent-difficulty ${difficultyClassName(difficulty)}`}>{difficulty}</p>
                    {
                        purchased ? (
                            <p className={`widgetComponent-difficulty margin-left-5px widgetComponentDifficulty-purchased`}>Purchased</p>
                        ) : (
                            <></>
                        )
                    }
                    
                </div>
                <h3 className="widgetComponent-header">{ text }</h3>
                <p className="widgetComponent-desc center-text">{ desc }</p>
                <div className="flex-row" style={{marginTop: "15px"}}>
                    <h1 className="widgetComponent-header">
                        {price}
                    </h1>
                    <div className="widgetComponentStarRating-container">
                        <StarRating num={starRating}/>
                    </div>
                </div>
            </div>
        </div>
    )
}