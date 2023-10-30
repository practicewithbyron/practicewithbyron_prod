import React from "react";

import "../../App.css";
import "./Alert.css"

export const Alert = ({Icon, title, message, type}) => {
    return (
        <div id={`${type}-id`}>
            <div className={`flex-row ${type}Alert-container`}>
                <Icon/>
                <div className="flex-column">
                    <h1 className={`${type}-title alert-title`}><b>{title}</b></h1>
                    <p className={`${type}-message alert-message`}>{message}</p>
                </div>
            </div>
        </div>
    )
}