import React from "react";
import { CheckInputIsntEmpty } from "../../validation/inputValidation.js";
import { Login }  from "../../db/login.jsx";
import { ErrorMessage } from "./ErrorMessage.js";
import { Button } from './../../components/Button/Button';

import Cookies from "js-cookie";

import "../../App.css";
import "./LoginPage.css";



export const LoginForm = ({setLoggingIn, setResetPassword}) => {
    return(
        <div id="loginpage-entry" className="center-content" style={{marginTop: "50px"}}>
            <div id="loginform-content" className="login-form loginForm-container">
                <h1 className="loginInput-title">Login</h1>
                <h2 className="loginInput-subtitle">Email</h2>
                <input id="loginEmailInput" className="login-input" type="text"></input>
                <h2 className="loginInput-subtitle">Password</h2>
                <input id="loginPasswordInput" className="login-input" type="password"></input>
                <Button text="Login" func={() => {
                    const email = document.getElementById("loginEmailInput").value;
                    const password = document.getElementById("loginPasswordInput").value;
                    
                    //Check input isn't empty
                    if(CheckInputIsntEmpty(email) || CheckInputIsntEmpty(password))
                    {
                        ErrorMessage("loginform-content", "Please fill in missing inputs")
                    }
                    else{
                        Login(email, password)
                        .then(res => {
                            setLoggingIn(true);
                            Cookies.set("jwtToken", res.data.detail.jwt, {expires: 1}); //might be wrong
                            window.location.href = '/dashboard';
                        })
                        .catch(err => {
                            console.log(err);
                            ErrorMessage("loginform-content", "Username or Password is incorrect");
                        })
                        .finally(() => {
                            setLoggingIn(false);
                        })
                    }
                }}/>
                <Button text="Forgot password" func={() => {
                    setResetPassword(true);
                }}/>
            </div>
        </div>
    )
}