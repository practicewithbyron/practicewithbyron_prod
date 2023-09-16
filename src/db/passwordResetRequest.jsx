import { Post } from "./post";
import { getURL } from "./getURL";

// Creates a password reset request with the given email
export const PasswordResetRequest = (email) => {
    return(
        Post(getURL() + "passwordResetRequest", {
            email: email,
        })
    )
}