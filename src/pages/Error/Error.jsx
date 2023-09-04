import React from "react";
import "../../App.css";
import "./Error.css";
import ErrorFace from "./ErrorFace";

export const Error = ({title, message}) => {
    console.log(message);
    return (
        <div className="center-content full-height flex-column" style={{width: "fit-content", margin: "auto"}}>
            <ErrorFace/>
            <h1 style={{width: "fit-content", margin: "5px auto"}}>{title}</h1>
            <h2 style={{width: "fit-content", margin: "0 auto"}}>{message}</h2>
        </div>
    )
}