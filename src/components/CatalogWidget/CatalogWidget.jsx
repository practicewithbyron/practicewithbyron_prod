import React from "react";
import "../../App.css";
import "./CatalogWidget.css";

export const CatalogWidget = ({text, setFilter}) => {
    return (
        <div className="catalogWidget-container" onClick={() => {
            setFilter(text);
        }}>
            <h3 className="center-text catalogWidget-text">{text}</h3>
        </div>
    )
}