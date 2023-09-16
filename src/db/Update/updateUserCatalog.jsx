import { Put } from "../put";

export const UpdateUserCatalog = (userId, catalogToAdd) => {
    return (
        Put(getURL() + "updateUserCatalog", {
        userId : userId,
        catalogToAdd : catalogToAdd
    }))
}