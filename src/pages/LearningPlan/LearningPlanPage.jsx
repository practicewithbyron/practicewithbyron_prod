import React, {useEffect, useState} from "react";

import "../../App.css";
import "./LearningPlanPage.css";
import { Button } from './../../components/Button/Button';

export const LearningPlanPage = () => {
    const [firstTime, setFirstTime] = useState(true);
    const [introTextIndex, setIntroTextIndex] = useState(0);
    const [technology, setTechnology] = useState(null);
    
    const introTexts = ["Here we can make you a personal learning plan to help you achieve you accreditation goals",
                        "What pace would you like to learn at?",
                        "What languages or technologies are you preparing for?",
                        "We recommend that you stick to the learning plan since it'll help you to achieve your goals"]

    useEffect(() => {
        if(introTextIndex === 3){
            setFirstTime(false);

            // Update user's learning plan
        }
    }, [introTextIndex])

    // Check user for their learning plan

    /*
        Different paths:
            PCEP 
            PCAP
            PCFP
    */

    return (
        <div className="center-text center-content flex-column introduction">
            {
                firstTime ? (
                    <>
                        <div className="flex-column learningPlanPageIntro-container complete-center">
                            {
                                introTextIndex === 0 ? (
                                    <h1 className="learningPlanPage-text">Welcome to your learning plan</h1>
                                ) : (            
                                    introTextIndex === 1 ? (
                                        <select name="learningPace" id="learningPaceID">
                                            <option value="easy">Slow (1 - 2 hours a week)</option>
                                            <option value="medium">Medium (2 - 4 hours a week)</option>
                                            <option value="hard">Fast (6+ hours a week)</option>
                                        </select>
                                    ) : (
                                        introTextIndex === 2 ? (
                                            <select name="technologyGoal" id="technologyGoalID" onSelect={() => {
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
                            <h2 className="learningPlanPage-text">{introTexts[introTextIndex]}</h2>
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