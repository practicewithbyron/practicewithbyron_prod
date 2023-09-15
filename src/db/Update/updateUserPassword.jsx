import { Put } from "../put";

export const UpdateUserPassword = (userId, password) => {
    return(
        Put("https://practicewithbyron-python.azurewebsites.net/api/updateUserPassword", {
            userId : userId,
            password : password
        })
    )
}