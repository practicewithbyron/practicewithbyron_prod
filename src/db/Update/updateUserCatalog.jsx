import axios from "axios";
import { getURL } from "../getURL";

export const UpdateUserCatalog = (catalogToAdd, jwt) => {
    return (
        Post(getURL() + "updateUserCatalog", {
            "catalogToAdd": catalogToAdd
        }, jwt)
    )
}