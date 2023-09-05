import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import "./PracticePage.css";

export const PracticeInput = ({data, reset, questionHook, setQuestionHook, questionNo, answerX, language}) => {
    return(
        <div className={`flex-row fit-content practiceInput-container ${data.detail[questionNo - 1].answer === answerX ? "practiceInputContainer-selected": ""}`} onClick={() => {
            reset();
            setQuestionHook(!questionHook);
            data.detail[questionNo - 1].answer = answerX;
        }}>
            <SyntaxHighlighter language={language} style={docco} wrapLongLines={true}>
                {answerX}
            </SyntaxHighlighter>
        </div>
    )
}