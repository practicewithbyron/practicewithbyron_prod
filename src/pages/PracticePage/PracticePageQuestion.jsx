import React from "react";
import { formatText } from "./FormatText";

import "./PracticePage.css";

export const PracticePageQuestion = ({question, language}) => {
    const formattedQuestion = formatText(question, language);
    return (
        formattedQuestion.map((component, index) => (
            <React.Fragment key={index}>
                { component }
            </React.Fragment>
        ))
    )

}

