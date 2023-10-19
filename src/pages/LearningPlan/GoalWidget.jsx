import React from "react";

import "./GoalWidget.css";
import "../../App.css";

export const GoalWidget = ({title, desc}) => {
    return (
        <div className="flex-column goalWidget-container">
            <h1 className="goalWidgetTitle-text">{title}</h1>
            <h2 className="goalWidgetSubtitle-text">{desc}</h2>
        </div>
    )
}