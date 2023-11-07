import React from "react";

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import SyntaxHighlighter from 'react-syntax-highlighter';

import "./DisabledInput.css";

export const DisabledInput = ({answer, selectedIncorrect, selectedCorrect, selected, language}) => {
    var backgroundColor = ""; // None
    if(selected)
    {
        if(selectedIncorrect)
        {
            backgroundColor = "rgb(255, 99, 132)"; //Red
        }
        else if(selectedCorrect)
        {
            backgroundColor = "rgb(78 255 58)"; //Green
        }
    }
    
    return(
        <div className="flex-row fit-content disabledInput-container" style={{backgroundColor: backgroundColor}}>
            <SyntaxHighlighter language={language} style={docco} wrapLongLines={true}>
                {answer}
            </SyntaxHighlighter>
        </div>
    )
}