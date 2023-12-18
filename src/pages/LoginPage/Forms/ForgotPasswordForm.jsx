import React from "react";
import { PasswordResetRequest } from '../../../db/passwordResetRequest';
import { CheckInputIsntEmpty } from "../../../validation/inputValidation";
import { IsEmailValid } from "../../../validation/emailValidation";
import { Button } from '../../../components/Button/Button';
import { TemplateForm } from "./TemplateForm";
import { Notification } from './../../../Notification';

import "../../../App.css";
import "../LoginPage.css";


//This is the form we enter our email into

const Form = ({setResetPassword}) => {
    return (
        <>
            <h2 className="loginInput-title">Password Reset Request</h2>
                <h3 className="forgotPassword-subtitle">Email</h3>
                <input id="forgotPasswordInput" className="login-input" type="text"></input>
                <Button text="Send Email" func={() => {
                    const email = document.getElementById("forgotPasswordInput");
                    const isEmailEmpty = CheckInputIsntEmpty(email.value);
                    if(isEmailEmpty){
                        Notification("warning", "Invalid Email", "Email cannot be empty")
                    }
                    else if(!IsEmailValid(email.value)){
                        Notification("warning", "Invalid Email", "Please enter a valid email")
                    }
                    else{
                        PasswordResetRequest(email.value, `${window.location.origin}/passwordreset`)
                        .then(res => { 
                            Notification("info", "Email sent!", "Make sure to check your spam folder")
                        })
                        .catch(err => {
                            Notification(err.response.data.detail);
                        })
                    }   
                }}/>
            <Button text="Back" func={() => {
                setResetPassword(false);
            }}/>
        </>
    )
}

export const ForgotPasswordForm = ({setResetPassword}) => {
    return (
        <TemplateForm FormContent={<Form setResetPassword={setResetPassword}/>}/>
    )
}