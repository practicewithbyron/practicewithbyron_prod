import React from "react";

import ErrorFace from "./ErrorFace";

import "./Error.css";
import "../../App.css";

export const Page404 = () => {
    return (
        <div className="center-text center-content flex-column height-100vh">
            <ErrorFace/>
            <h1 className="errorTitle-text">404 Page Not Found</h1>
        </div>
    )
}