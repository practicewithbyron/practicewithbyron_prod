import { Post } from "./post";
import { getURL } from "./getURL";

// Creates a password reset request with the given email
export const PasswordResetRequest = (email, url) => {
    return(
        Post(getURL() + "passwordResetRequest", {
            "email": email,
            "url": url
        })
    )
}