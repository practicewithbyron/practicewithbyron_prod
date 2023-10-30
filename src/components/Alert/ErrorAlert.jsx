import React from "react";

import "../../App.css";
import "./Alert.css";
import { Alert } from "./Alert";
import { ExclamationMark } from "./ExclamationMark";

const ErrorExclamationMark = () => { 
    return (
        ExclamationMark("#910101")
    )
}

export const ErrorAlert = ({errorTitle, errorMessage}) => {
    return (
        <Alert type="error" title={errorTitle} message={errorMessage} Icon={ErrorExclamationMark}/>
    )
}