import { Put } from "../put";
import { getURL } from "../getURL";

export const UpdateUserPassword = (userId, password) => {
    return(
        Put(getURL() + "updateUserPassword", {
            userId : userId,
            password : password
        })
    )
}