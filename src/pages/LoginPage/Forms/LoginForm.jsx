import React from "react";
import { CheckInputIsntEmpty } from "../../../validation/inputValidation.js";
import { Login }  from "../../../db/login.jsx";
import { ErrorMessage } from "../ErrorMessage.js";
import { Button } from '../../../components/Button/Button.jsx';
import { TemplateForm } from "./TemplateForm.jsx";

import Cookies from "js-cookie";

import "../../../App.css";
import "../LoginPage.css";

const Form = ({setLoggingIn, setResetPassword, setRegister}) => 
        <>
            <h1 className="loginInput-title">Welcome back!</h1>
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
                        const destination = localStorage.getItem("destination");
                        localStorage.removeItem("destination");
                        setLoggingIn(true);
                        Cookies.set("jwtToken", res.data.detail.jwt, {expires: 1}); //might be wrong
                        //If a destination after login has been set
                        if(destination){
                            window.location.href = `/${destination}`;
                        }
                        else{
                            window.location.href = "/dashboard"
                        }
                        
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
            <h1 className="font-size-15rem margin-top-5px color-primary cursor-pointer" onClick={() => {
                setRegister(true);
            }}>
                Create an account
            </h1>
        </>

export const LoginForm = ({setLoggingIn, setResetPassword, setRegister}) => {
    return(
        <TemplateForm FormContent={<Form setLoggingIn={setLoggingIn} setResetPassword={setResetPassword} setRegister={setRegister}/>}/>
    )
}