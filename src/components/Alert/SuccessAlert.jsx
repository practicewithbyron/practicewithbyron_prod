import React from "react";

import "../../App.css";
import "./Alert.css";
import { Alert } from "./Alert";

const Tick = () => {
    return (
        <div className="alertIcon-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 50 50"
                fill="#006c0b"
            >
                <path d="M25 2C12.317 2 2 12.317 2 25s10.317 23 23 23 23-10.317 23-23c0-4.56-1.34-8.81-3.637-12.389l-1.369 1.618A20.846 20.846 0 0146 25c0 11.579-9.421 21-21 21S4 36.579 4 25 13.421 4 25 4c5.443 0 10.394 2.1 14.129 5.51l1.309-1.545A22.912 22.912 0 0025 2zm18.236 5.754l-19.322 22.8-8.133-7.585-1.363 1.463 9.666 9.015 20.68-24.4-1.528-1.293z"></path>
            </svg>
        </div>

    )
}

export const SuccessAlert = ({successTitle, successMessage}) => {
    return (
        <Alert type="success" title={successTitle} message={successMessage} Icon={Tick}/>
    )
}