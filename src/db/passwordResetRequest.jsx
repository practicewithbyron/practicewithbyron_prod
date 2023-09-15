import { Post } from "./post";

// Creates a password reset request with the given email
export const PasswordResetRequest = (email) => {
    return(
        Post("https://practicewithbyron-python.azurewebsites.net/api/passwordResetRequest", {
            email: email,
        })
    )
}