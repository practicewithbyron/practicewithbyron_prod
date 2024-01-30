import React from "react";
import { formatText } from './FormatText';
import "./DisabledInput.css";

export const DisabledInput = ({answer, selectedIncorrect, selectedCorrect, selected, language}) => {
    var backgroundColor = ""; // None
    if(selected)
    {
        if(selectedIncorrect)
        {
            backgroundColor = "rgb(255, 99, 132, 0.2)"; //Red
        }
        else if(selectedCorrect)
        {
            backgroundColor = "rgb(78, 255, 58, 0.2)"; //Green
        }
    }
    
    return(
        <div className="flex-row fit-content disabledInput-container" style={{backgroundColor: backgroundColor}}>
            {formatText(answer, language)}
        </div>
    )
}