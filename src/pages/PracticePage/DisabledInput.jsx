import React from "react";

export const DisabledInput = ({answer, isCorrect, selected}) => {
    return(
        <div className="flex-row fit-content practiceInputContainer" style={{background: isCorrect ? "rgba(75, 192, 192, 0.2)" : (isCorrect != selected ? "rgba(255, 99, 132, 1)" : "")}}>
            <input type="radio" className="radio-button" disabled={true} checked={selected}/>
            <h4 style={{marginLeft: "5px"}}>{answer}</h4> 
        </div>
    )
}