import React from "react";
import "./QuestionNavigator.css";

export const QuestionNavigator = ({noOfQuestions, setQuestionNo, questionNo}) => {
    
    return (
        <div className="flex-column questionNavigator-container">
            <h3 className="questionIndex-header">Questions Index</h3>
            <div className="flex flex-column questionIndex-container">
                {Array.from({ length: noOfQuestions }).map((_, index) => (
                    <div
                    key={index} // Add a unique key for each element
                    className={`questionNavigator-button ${questionNo == index + 1 ? "questionNavigatorButton-selected" : ""}`}
                    onClick={() => setQuestionNo(index + 1)} // Pass a function reference
                    >
                    {index+1} {/* Display the index */}
                    </div>
                ))}
            </div>
        </div>

    )
}