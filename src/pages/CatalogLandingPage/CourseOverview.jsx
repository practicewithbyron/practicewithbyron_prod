import React from "react";
import { CatalogLandingPageStatItem } from './CatalogLandingPageStatItem';

import "../../App.css";
import "./CatalogLandingPage.css";

export const CourseOverview = ({difficulty, noOfQuestions}) => {
    return (
        <div className="flex-column catalogLandingStats-container">
            <h1 className="catalogLandingPageStatItem-title">Course Overview</h1>
            <CatalogLandingPageStatItem text={difficulty} img="glyphicon glyphicon-stats"/>  
            <CatalogLandingPageStatItem text="Lifetime Access" img="glyphicon glyphicon-bell"/>  
            <CatalogLandingPageStatItem text={`${noOfQuestions} Questions`} img="glyphicon glyphicon-question-sign"/>  
            <CatalogLandingPageStatItem text="Progress Tracking Statistics" img="glyphicon glyphicon-signal"/>  
            <CatalogLandingPageStatItem text="Personalized Training Plan" img="glyphicon glyphicon-calendar"/>  

            
        </div>
    )
}