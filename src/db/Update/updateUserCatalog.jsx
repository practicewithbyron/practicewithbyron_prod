import React from "react";
import { Put } from "../put";

export const UpdateUserCatalog = (userId, catalogToAdd) => {
    return (
        Put("http://127.0.0.1:8000/api/updateUserCatalog", {
        userId : userId,
        catalogToAdd : catalogToAdd
    }))
}