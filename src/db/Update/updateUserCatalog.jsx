import { Put } from "../put";
import { getURL } from "../getURL";

export const UpdateUserCatalog = (userId, catalogToAdd) => {
    return (
        Put(getURL() + "updateUserCatalog", {
        userId : userId,
        catalogToAdd : catalogToAdd
    }))
}