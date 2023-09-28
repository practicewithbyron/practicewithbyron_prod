import React from "react";

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import SyntaxHighlighter from 'react-syntax-highlighter';

import "./DisabledInput.css";

export const DisabledInput = ({answer, isCorrect, selected, language}) => {
    return(
        <div className="flex-row fit-content disabledInput-container" style={{backgroundColor: isCorrect ? "rgb(78 255 58)" : (isCorrect !== selected ? "rgba(255, 99, 132, 1)" : "")}}>
            <SyntaxHighlighter language={language} style={docco} wrapLongLines={true}>
                {answer}
            </SyntaxHighlighter>
        </div>
    )
}