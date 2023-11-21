import React, { useState } from 'react';
import { Loading } from "../Loading/loading.jsx";
import { LoginForm } from './LoginForm.jsx';
import { RegisterForm } from './RegisterForm.jsx';
import { ForgotPasswordForm } from './ForgotPasswordForm.jsx';
import { Button } from '../../components/Button/Button.jsx';

import "../../App.css";
import "./LoginPage.css";

export const LoginPage = () => {
    const [register, setRegister] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);

    if(resetPassword){
        return (
            <div className="flex-row">
                <ForgotPasswordForm setResetPassword={setResetPassword}/>
                <img style={{backgroundColor: "var(--primary-color"}} width="60%" src={require("../../imgs/homeImg2.png")} alt="" />            </div>
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
                <img style={{backgroundColor: "var(--primary-color"}} width="60%" src={require("../../imgs/homeImg2.png")} alt="" />
            </div>
        )
    }
    else{
        return (
            <div className="flex-row" style={{justifyContent: "right"}}>
                <LoginForm setLoggingIn={setLoggingIn} setResetPassword={setResetPassword} setRegister={setRegister}/>
                <img style={{backgroundColor: "var(--primary-color"}} width="60%" src={require("../../imgs/homeImg2.png")} alt="" />
            </div>
        )
    }
}