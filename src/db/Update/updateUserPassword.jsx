import { Put } from "../put";

export const UpdateUserPassword = (userId, password) => {
    return(
        Put(getURL() + "updateUserPassword", {
            userId : userId,
            password : password
        })
    )
}