import React from "react";

import "./TandCPage.css";

export const TandCSubsection = ({title, paragraphs}) => {
    return(
        <div>
            <h2 className="TandCPage-text TandCPage-title">{title}</h2>
            {
                paragraphs.map(el => {
                    return (
                        <p className="TandCPage-text">{el}</p>
                    )
                })
            }
        </div>
    )
}