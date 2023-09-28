import React from "react";
import "./PracticePercentageBar.css";

export const PracticePercentageBar = ({correct, incorrect, skipped}) => {
    return(
        <div className="flex-row practiceBar-container">
            <div className="flex-row practiceBar-element correct" style={{flexGrow: correct}}>
                <h4 style={{margin: "auto"}}>{(correct / (incorrect + skipped + correct)).toFixed(2) * 100}%</h4>
            </div>
            <div className="flex-column practiceBar-element incorrect" style={{flexGrow: incorrect}}>
                <h4 style={{margin: "auto"}}>{(incorrect / (incorrect + skipped + correct)).toFixed(2) * 100}%</h4>
            </div>
            <div className="flex-row practiceBar-element skipped" style={{flexGrow: skipped}}>
                <h4 style={{margin: "auto"}}>{(skipped / (incorrect + skipped + correct)).toFixed(2) * 100}%</h4>
            </div>
        </div>
    )
}