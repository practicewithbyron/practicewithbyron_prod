import React from "react";

import "../../App.css";
import "./Alert.css";
import { Alert } from "./Alert";
import { ExclamationMark } from "./ExclamationMark";

const InfoExclamationMark = () => { 
    return (
        ExclamationMark("#4da9ff")
    )
}

export const InfoAlert = ({infoTitle, infoMessage}) => {
    return (
        <Alert type="info" title={infoTitle} message={infoMessage} Icon={InfoExclamationMark}/>
    )
}