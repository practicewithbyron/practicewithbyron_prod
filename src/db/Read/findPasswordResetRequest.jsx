import React from "react";
import { Post } from "../post";

// Finds the password reset request for the given token
export const FindPasswordResetRequest = (token) => {
    return(
        Post("http://127.0.0.1:8000/api/getPasswordResetRequest", {
            token: token,
        })
    )
}