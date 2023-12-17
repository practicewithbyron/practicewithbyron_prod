import React from "react";
import { PasswordResetRequest } from '../../../db/passwordResetRequest';
import { NotificationMessage } from "../NotifcationMessage";
import { ErrorMessage } from '../ErrorMessage';
import { CheckInputIsntEmpty } from "../../../validation/inputValidation";
import { IsEmailValid } from "../../../validation/emailValidation";
import { Button } from '../../../components/Button/Button';
import { TemplateForm } from "./TemplateForm";

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
                        ErrorMessage("forgotPassword-content", "Please enter your email")
                    }
                    else if(!IsEmailValid(email.value)){
                        ErrorMessage("forgotPassword-content", "Please enter a valid email")
                    }
                    else{
                        PasswordResetRequest(email.value, `${window.location.origin}/passwordreset`)
                        .then(res => {
                            NotificationMessage("forgotPassword-content", "Email sent!");                 
                        })
                        .catch(err => {
                            ErrorMessage("forgotPassword-content", err.message);
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