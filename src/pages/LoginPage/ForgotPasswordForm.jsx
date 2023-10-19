import React from "react";

import "../../App.css";
import "../LoginPage/LoginPage.css";
import { PasswordResetRequest } from '../../db/passwordResetRequest';
import { NotificationMessage } from "./NotifcationMessage";
import { ErrorMessage } from './ErrorMessage';
import { CheckInputIsntEmpty } from "../../validation/inputValidation";
import { IsEmailValid } from "../../validation/emailValidation";
import { Button } from './../../components/Button/Button';

//This is the form we enter our email into

export const ForgotPasswordForm = () => {
    return (
        <div id="forgotPassword-entry" className="center-content" style={{marginTop: "50px"}}>
            <div id="forgotPassword-content" className="login-form forgotPassword-form">
                <h2 className="form-title">Password Reset Request</h2>
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
            </div>
        </div>
    )
}