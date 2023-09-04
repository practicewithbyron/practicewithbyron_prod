import React from "react";

import "./PaymentPage.css";
import "../../App.css";

export const PaymentPageSelection = ({state, set, reset, text}) => {
    return (
        <div className={`flex-row fit-content paymentPage-selection ${state ? "paymentPageSelection-selected" : ""}`} onClick={() => {
            reset();
            set(true);
        }}>
            {text}
        </div>
    )
}