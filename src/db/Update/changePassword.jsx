import { Post } from "../post";

export const ChangePassword = (email, password) => {
    return(
        Post(getURL() + "changePassword", {
            email : email,
            password : password
        })
    )
}