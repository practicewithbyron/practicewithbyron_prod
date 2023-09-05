import React from "react";

export const HomeWidget2 = ({subtext, title, paragraph, img}) => {
    return(
        <div className="widget-container flex-row" style={{textAlign: "left"}}>
            <div className="widgetImg-container">
                <img className="widget-img" src={require(`../../imgs/${img}`)} alt=""></img>
            </div>
            <div className="widgetText-container">
                <div className="color-text">
                    {subtext}
                </div>
                <h3 className="widget-title">
                    {title}
                </h3>
                <p className="paragraph">
                    {paragraph}
                </p>
            </div>
        </div>
    )
}