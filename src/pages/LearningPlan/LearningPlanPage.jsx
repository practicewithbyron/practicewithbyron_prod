import React, {useEffect, useState} from "react";

import "../../App.css";
import "./LearningPlanPage.css";
import { Button } from './../../components/Button/Button';
import { IsLoggedIn } from "../../IsLoggedIn";

export const LearningPlanPage = () => {
    const [firstTime, setFirstTime] = useState(true);
    const [introTextIndex, setIntroTextIndex] = useState(0);
    const [technology, setTechnology] = useState(null);

    console.log(technology); // Remove eslint errors

    useEffect(() => {
        IsLoggedIn("learningpath")
    }, [])

    useEffect(() => {
        if(introTextIndex === 3){
            setFirstTime(false);

            // Update user's learning plan
        }
    }, [introTextIndex])

    const introTexts = [
        "Here we can make you a personal learning plan to help you achieve you accreditation goals",
        "What pace would you like to learn at?",
        "What languages or technologies are you preparing for?",
        "We recommend that you stick to the learning plan since it'll help you to achieve your goals"
    ]

    // Check user for their learning plan

    /*
        Different paths:
            PCEP 
            PCAP
            PCFP
    */

    return (
        <div className="center-text center-content flex-column full-height">
            {
                firstTime ? (
                    <>
                        <div className="flex-column learningPlanPageIntro-container complete-center">
                            {
                                introTextIndex === 0 ? (
                                    <h1 className="learningPlanPage-text">Welcome to your learning plan</h1>
                                ) : (            
                                    introTextIndex === 1 ? (
                                        <select name="learningPace" id="learningPaceID" className="learningPlan-select">
                                            <option value="easy">Slow (1 - 2 hours a week)</option>
                                            <option value="medium">Medium (2 - 4 hours a week)</option>
                                            <option value="hard">Fast (6+ hours a week)</option>
                                        </select>
                                    ) : (
                                        introTextIndex === 2 ? (
                                            <select name="technologyGoal" id="technologyGoalID" className="learningPlan-select" onSelect={() => {
                                                setTechnology(document.getElementById("technologyGoalID").value);
                                            }}>
                                                <option value="Python">Python</option>
                                                <option value="Java">Java</option>
                                                <option value="JavaScript">JavaScript</option>
                                                <option value="PSD1">Professional Scrum Developer I</option>
                                            </select>
                                        ) : (
                                            <></>
                                        )
                                    )
                                
                                )
                            }
                            <p className="learningPlanPage-text">{introTexts[introTextIndex]}</p>
                            <Button text="Next" func={() => {setIntroTextIndex(introTextIndex + 1)}}/>
                        </div>

                    </>

                ) : (
                    <div className="">
                        
                    </div>
                )
            }
        </div>
    )
}