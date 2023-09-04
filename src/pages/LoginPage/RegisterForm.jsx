import React, { useState } from 'react';
import { ErrorMessage } from "./ErrorMessage";
import { Register } from "../../db/register.jsx";


import { PasswordValidation } from '../../validation/passwordValidation';
import { IsEmailValid } from './../../validation/emailValidation';
import { CheckInputIsntEmpty } from './../../validation/inputValidation';
import { NotificationMessage } from './NotifcationMessage';
import { Button } from '../../components/Button/Button';

export const RegisterForm = () => {
    return (
        <div id="register-entry" className="center-content" style={{marginTop: "50px"}}>
            <div id="registerForm-content" className="login-form register-form">
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

                    //Input validation
                    if(CheckInputIsntEmpty(email.value) || CheckInputIsntEmpty(pass1.value) || CheckInputIsntEmpty(pass2.value))
                    {
                        ErrorMessage("registerForm-content", "Please fill in missing inputs")
                    }
                    //Email validation
                    else if(!IsEmailValid(email.value)){
                        ErrorMessage("registerForm-content", "Please enter a valid email")
                    }
                    //Password validation
                    else if (PasswordValidation(pass1.value).length != 0)
                    {
                        const errorMessage = "Invalid Password";
                        ErrorMessage("registerForm-content", errorMessage);
                    }
                    else if(pass1.value === pass2.value)
                    {
                        Register(email.value, pass1.value)
                        .then(res => {
                            console.log(res);
                            //Check if user already exists
                            if(res.data.detail.Error != undefined)
                            {
                                ErrorMessage("registerForm-content", "Account already exists with that email");
                            }
                            else{
                                window.location.reload();
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                    else
                    {
                        const errorMessage = "Please make sure password match."
                        ErrorMessage("registerForm-content", errorMessage);
                    }
                }}/>
            </div>
        </div>
    )
}