import React, { useState } from 'react';
import { Loading } from "../Loading/loading.jsx";
import { LoginForm } from './LoginForm.jsx';
import { RegisterForm } from './RegisterForm.jsx';
import { ForgotPasswordForm } from './ForgotPasswordForm.jsx';
import { Button } from '../../components/Button/Button.jsx';

import "../../App.css";
import "./LoginPage.css";

export const LoginPage = () => {
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);

    if(login){
        if(resetPassword){
            return (
                <ForgotPasswordForm/>
            )
        }
        if(loggingIn){
            return(
                <Loading />
            )
        }
        else{
            return(
                <LoginForm setLoggingIn={setLoggingIn} setResetPassword={setResetPassword}/>
            )
        }
    }
    else if(register){
        return(
            <RegisterForm/>
        )
    }
    else{
        return (
            <>
                <div id="loginpage-entry" className="center-content" style={{marginTop: "50px"}}>
                    <div id="loginform-content" className="login-form login-container">
                        <h1 className="loginTitle-text">Log in</h1>
                        <Button text="Login" func={() => {
                           setLogin(true); 
                        }}/>
                        <Button text="Register" func={() => {
                           setRegister(true);
                        }}/>
                    </div>
                </div>
            </>
        )
    }
}