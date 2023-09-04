import React from "react";
import { Put } from "../put";

export const UpdateUserPassword = (userId, password) => {
    return(
        Put("http://127.0.0.1:8000/api/updateUserPassword", {
            userId : userId,
            password : password
        })
    )
}