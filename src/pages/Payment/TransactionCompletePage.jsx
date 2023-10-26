import React from "react";

import "../../App.css";
import "./TransactionComplete.css";
import { Button } from './../../components/Button/Button';

export const TransactionCompletePage = () => {
    return (
        <div className="transactionComplete-container complete-center">
            <img className="transactionComplete-img" src={require("./check.gif")} alt="✅"/>
            <h1 className="transactionComplete-text transactionComplete-title">Thank You for Your Purchase!</h1>
            <h4 className="transactionComplete-text transactionComplete-paragraph">Your order was completed successfully</h4>
            <Button text="Dashboard" func={() => {
                window.location.href = "/dashboard"
            }}/>
        </div>
    )
}