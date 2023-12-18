import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Button } from '../../../components/Button/Button';
import { Loading } from '../../Loading/loading';
import { Error } from '../../Error/Error';
import { FindPasswordResetRequest } from '../../../db/Read/findPasswordResetRequest';
import { ChangePassword } from '../../../db/Update/changePassword';
import { Notification } from '../../../Notification';

import "../../../App.css"
import "../LoginPage.css";

// This is where we actually change our password once we go on the email link

export const ResetPassword = () => {
    const {token} = useParams(); 

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    if(isFetching){
        FindPasswordResetRequest(token)
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setIsFetching(false)
        });  
    }

    if(error){
        return (
            <Error title="Error" message={error.message}/>
        )
    }
    else if(isFetching){
        return (
            <Loading/>
        )
    }
    else{
        return (
            <div id="resetPassword-entry" className="center-content" style={{marginTop: "50px"}}>
                <div id="resetPassword-content" className="loginForm">
                    <h2 className="form-title">Change Password</h2>
                    <h3 className="resetPassword-subtitle">New Password</h3>
                    <input id="resetPassword" className="login-input" type="password"></input>
                    <Button text="Change Password" func={() => {
                        const newPassword = document.getElementById("resetPassword");
                        ChangePassword(data.detail.email, newPassword.value)
                        .then(res => {
                            if (res.data.detail.modifiedCount === 1){
                                Notification("success", "Success", "Password changed successfully")
                            }
                            else {
                                Notification("danger", "Error", "Something went wrong, please refresh the page and try again")
                            }
                        })
                        .catch(err => {
                            Notification("danger", "Error", `Something went wrong ${err}`)
                        })
                    }}/>
                </div>
            </div>
        )
    }
}