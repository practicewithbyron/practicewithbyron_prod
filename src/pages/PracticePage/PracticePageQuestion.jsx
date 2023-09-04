import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import "./PracticePage.css";

export const PracticePageQuestion = ({question, language}) => {
    return (
        <div className="practiceQuestion-container">
            <SyntaxHighlighter language={language} style={docco} wrapLongLines={true}>
                {question}
            </SyntaxHighlighter>
        </div>

    );
}

