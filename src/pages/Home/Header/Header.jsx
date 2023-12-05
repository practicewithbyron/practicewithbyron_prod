import React from "react";
import "./Header.css";
import "../../../App.css";
import video from "../../../vids/homePage.mp4"

export const Header = () => {
    return(
        <div className="header-page flex-row">
            <div className="flex-column headerText-container">
                <h1 className="header-title headerTitle-container">Become the developer, <br/> that companies want</h1>
                <h2 className="header-subtitle">Save countless hours searching for content, <br/> we've got it all here in one place.</h2>
            </div>
            <video className="header-vid" controls muted autoPlay>
                <source src={video} type="video/mp4"/>
            </video>
        </div>            
    )
}