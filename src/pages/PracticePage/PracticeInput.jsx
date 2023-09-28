import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import "./PracticePage.css";

export const PracticeInput = ({reset, questionHook, setQuestionHook, questionNo, answerX, language}) => {
    const currentExamJSON = localStorage.getItem("currentExam");
    var selectedClassString = "";
    // Parse the existing data from Local Storage
    if(currentExamJSON){
        const currentExam = JSON.parse(currentExamJSON);
        const isSelected = currentExam[currentExam.findIndex(item => item.questionNo === questionNo)]?.answerX === answerX;
        if (isSelected){
            selectedClassString = "practiceInputContainer-selected";
        }
    }
    return(
        <div className={`flex-row fit-content practiceInput-container ${selectedClassString}`} onClick={() => {
            reset();
            setQuestionHook(!questionHook);
            if (currentExamJSON) {
                const currentExam = JSON.parse(currentExamJSON);
                // Search for an existing entry with the same question number
                const existingEntryIndex = currentExam.findIndex(item => item.questionNo === questionNo);
                if (existingEntryIndex !== -1) {
                    // If an entry with the same question number exists, update it
                    currentExam[existingEntryIndex] = { questionNo, answerX };
                } else {
                    // If no entry with the same question number is found, push a new entry
                    console.log({ questionNo, answerX });
                    currentExam.push({ questionNo, answerX });
                }
            
                // Store the modified array back into Local Storage
                localStorage.setItem("currentExam", JSON.stringify(currentExam));
            
                console.log(currentExam); // This will show the updated array
            } else {
                // Create a new array with the first item and store it in Local Storage
                const initialData = [{ questionNo, answerX }];
                localStorage.setItem("currentExam", JSON.stringify(initialData));
            }

        }}>
            <SyntaxHighlighter language={language} style={docco} wrapLongLines={true}>
                {answerX}
            </SyntaxHighlighter>
        </div>
    )
}