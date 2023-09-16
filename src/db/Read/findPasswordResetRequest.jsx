import { Post } from "../post";
import { getURL } from "../getURL";

// Finds the password reset request for the given token
export const FindPasswordResetRequest = (token) => {
    return(
        Post(getURL() + "getPasswordResetRequest", {
            token: token,
        })
    )
}