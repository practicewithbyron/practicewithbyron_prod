import React from "react";
import "./Button.css"

export const Button = ({text, func}) => {
    return (
        <div className="flex-row customButton" onClick={() => {
            func();
        }}>
            <h4 className="customButton-text">{text}</h4>
        </div>
    )
}