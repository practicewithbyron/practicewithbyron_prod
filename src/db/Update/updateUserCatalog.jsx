import { Put } from "../put";

export const UpdateUserCatalog = (userId, catalogToAdd) => {
    return (
        Put("https://practicewithbyron-python.azurewebsites.net/api/updateUserCatalog", {
        userId : userId,
        catalogToAdd : catalogToAdd
    }))
}