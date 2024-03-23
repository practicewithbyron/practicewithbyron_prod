import React from "react";
import "./PracticeQuestionImage.css"

export const PracticeQuestionImage = ({ imageUrl }) => {
    return (
        <div className="center-content">
            <img src={imageUrl} className="practiceQuestion-image" alt="img" />
        </div>
    )
  };