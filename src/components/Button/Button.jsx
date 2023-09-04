import React from "react";
import "./Button.css"

export const Button = ({text, func}) => {
    return (
        <div className="flex-row login-button" onClick={() => {
            func();
        }}>
            <h4 className="loginButton-text">{text}</h4>
        </div>
    )
}