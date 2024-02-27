import React, { useState } from 'react';
import { Loading } from "../Loading/loading.jsx";
import { LoginForm } from './Forms/LoginForm.jsx';
import { RegisterForm } from './Forms/RegisterForm.jsx';
import { ForgotPasswordForm } from './Forms/ForgotPasswordForm.jsx';
import { LoginMessage } from './LoginMessage.jsx';

import "../../App.css";
import "./LoginPage.css";

const Image = () => {
    return (
        <div className='primary-background min-height-100vh width-60 center-content loginPageImage-container'>
            <img className='width-fill-available' src={require("../../imgs/homeImg2.png")} alt="" />
        </div>
    )
}

export const LoginPage = () => {
    const [register, setRegister] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);

    if(resetPassword){
        return (
            <div className="flex-row">
                <ForgotPasswordForm setResetPassword={setResetPassword}/>
                <Image/>        
            </div>
        )
    }
    else if(loggingIn){
        return(
            <Loading/>
        )
    }
    else if(register){
        return(
            <div className="flex-row">
                <RegisterForm setRegister={setRegister}/>
                <Image/>
            </div>
        )
    }
    else{
        return (
            <div className="flex-row">
                <LoginMessage/>
                <LoginForm setLoggingIn={setLoggingIn} setResetPassword={setResetPassword} setRegister={setRegister}/>
                <Image/>
            </div>
        )
    }
}