import React from 'react';
import { Register } from "../../../db/register.jsx";
import { PasswordValidation } from '../../../validation/passwordValidation.js';
import { IsEmailValid } from '../../../validation/emailValidation.js';
import { CheckInputIsntEmpty } from '../../../validation/inputValidation.js';
import { Button } from '../../../components/Button/Button.jsx';
import { TemplateForm } from './TemplateForm.jsx';
import { Notification } from '../../../Notification.js';

import "../../../App.css";
import "../LoginPage.css";

const Form = ({setRegister}) => {
    return (
        <>
            <h1 className="loginInput-title">Register</h1>
            <h2 className="loginInput-subtitle">Email</h2>
            <input id="registerEmailInput" className="login-input" type="text"></input>
            <h2 className="loginInput-subtitle">Password</h2>
            <input id="registerPasswordInput" className="login-input" type="password"></input>
            <h2 className="loginInput-subtitle">Confirm Password</h2>
            <input id="registerPasswordConfirmInput" className="login-input" type="password"></input>
            <Button text="Register" func={() => {
                //Check passwords are equal.
                const email = document.getElementById("registerEmailInput");
                const pass1 = document.getElementById("registerPasswordInput");
                const pass2 = document.getElementById("registerPasswordConfirmInput");

                const passwordValidation = PasswordValidation(pass1.value)

                //Input validation
                if(CheckInputIsntEmpty(email.value) || CheckInputIsntEmpty(pass1.value) || CheckInputIsntEmpty(pass2.value))
                {
                    Notification("warning", "Input Error", "Please fill in the missing inputs");
                }
                //Email validation
                else if(!IsEmailValid(email.value)){
                    Notification("warning", "Invalid Email", "Please enter a valid email")
                }
                //Password validation
                else if (passwordValidation.length !== 0)
                {
                    passwordValidation.forEach(el => {
                        Notification("warning", "Invalid Password", el)
                    })
                }
                else if(pass1.value === pass2.value)
                {
                    Register(email.value, pass1.value)
                    .then(async res => {
                        if(res.status === 200)
                        {
                            Notification("success", "Registration Successful", "Account has been successfully registered");
                            await new Promise(resolve => setTimeout(resolve, 3500)); 
                            window.location.href = "/catalog";
                        }
                    })
                    .catch(err => {
                        Notification("warning", "Registration Error", err.response.data.detail);
                    })
                }
                else
                {
                    Notification("warning", "Invalid Password", "Make sure passwords match");
                }
            }}/>
            <Button text="Back" func={() => {
                setRegister(false);
            }}/>
        </>
    )
}

export const RegisterForm = ({setRegister}) => {
    return (
        <TemplateForm FormContent={<Form setRegister={setRegister}/>}/>
    )
}