import { Post } from "./post";

// Creates a password reset request with the given email
export const PasswordResetRequest = (email) => {
    return(
        Post("http://127.0.0.1:8000/api/passwordResetRequest", {
            email: email,
        })
    )
}