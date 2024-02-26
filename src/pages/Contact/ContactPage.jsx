import React, { useRef } from "react";
import { useState, useEffect, myRef, useCallback } from "react";
import "./ContactPage.css";
import "../../App.css";
import ContactButton from "./ContactButton";
import { ContactImg } from './ContactImg';

const InputTemplate = ({containerId, inputId, containerClass, inputClass, placeholder}) => {
    // On smaller screens the width is variable which goes against the logic for the selector
    const { height, width } = useWindowDimensions();  

    return (
        <div id={containerId} className={containerClass}>
            <input id={inputId} className={`contact-input ${inputClass}`} placeholder={placeholder} onBlur={() => {
                if (width > 455){
                    var element = document.getElementById(containerId);
                    element.classList.remove("input-boxSlideInComplete");
                }
            }} onFocus={() => {
                if (width > 455){
                    var element = document.getElementById(containerId);
                    element.classList.add("input-boxSlideInComplete");
                }
            }}/>
        </div>
    )
}

const TextAreaTemplate = ({containerId, inputId, containerClass, inputClass, placeholder}) => {
    // On smaller screens the width is variable which goes against the logic for the selector
    const { height, width } = useWindowDimensions();  

    return (
        <div id={containerId} className={containerClass}>
            <textarea id={inputId} className={`contact-input resize-none ${inputClass}`} placeholder={placeholder} onBlur={() => {
                if (width > 455){
                    var element = document.getElementById(containerId);
                    element.classList.remove("input-boxSlideInComplete");
                }
            }} onFocus={() => {
                if (width > 455){
                    var element = document.getElementById(containerId);
                    element.classList.add("input-boxSlideInComplete");
                }
            }}/>
        </div>
    )
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
  
export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export const ContactPage = () => {   
    return (
        <div className="min-height-100vh flex-row">
            <div className="form-container flex-column min-height-fill-available center-content min-width-40">
                <div class="flex-column max-width-fit-content contactTitle-container">
                    <h1 class="font-size-3rem text-align-center">Contact</h1>
                    <div class="background-orange height-3px margin-top-3px text-align-center" />
                </div>
                <p className="contact-description contactTitle-container text-align-center">
                    Please don't hesitate to contact us regarding any problems or queries you may have.
                </p>
                <div className="flex-row min-width-40">
                    <form id="contactform">
                        <div className="flex-column">
                            <div className="nameSubject-row">
                                <InputTemplate containerId="nameInput-container" inputId="name-input" containerClass="nameInput-container" inputClass="name-input" placeholder="Name"/>
                                <InputTemplate containerId="subjectInput-container" inputId="subject-input" containerClass="nameInput-container" inputClass="name-input" placeholder="Subject"/>
                            </div>
                            <InputTemplate containerId="emailInput-container" inputId="email-input" containerClass="emailInput-container" inputClass="email-input" placeholder="Email"/>
                            <TextAreaTemplate containerId="bodyInput-container" inputId="body-input" containerClass="bodyInput-container" inputClass="body-input" placeholder="Body"/>
                            <ContactButton/>
                        </div>
                    </form>
                </div>
            </div>
            <div className='contactImg-container primary-background min-height-fill-available min-width-60 center-content'>
                <ContactImg/>
            </div>
        </div>
        
    )
}

