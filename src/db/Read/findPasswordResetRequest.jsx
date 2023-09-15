import { Post } from "../post";

// Finds the password reset request for the given token
export const FindPasswordResetRequest = (token) => {
    return(
        Post("https://practicewithbyron-python.azurewebsites.net/api/getPasswordResetRequest", {
            token: token,
        })
    )
}