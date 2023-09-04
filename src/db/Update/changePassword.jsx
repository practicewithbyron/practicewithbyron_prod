import { Post } from "../post";

export const ChangePassword = (email, password) => {
    return(
        Post("http://127.0.0.1:8000/api/changePassword", {
            email : email,
            password : password
        })
    )
}