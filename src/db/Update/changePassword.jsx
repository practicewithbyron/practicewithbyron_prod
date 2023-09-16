import { Post } from "../post";
import { getURL } from "../getURL";

export const ChangePassword = (email, password) => {
    return(
        Post(getURL() + "changePassword", {
            email : email,
            password : password
        })
    )
}