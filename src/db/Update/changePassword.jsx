import { Post } from "../post";

export const ChangePassword = (email, password) => {
    return(
        Post("https://practicewithbyron-python.azurewebsites.net/api/changePassword", {
            email : email,
            password : password
        })
    )
}