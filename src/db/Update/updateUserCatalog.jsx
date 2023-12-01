import { Post } from "../post";
import { getURL } from "../getURL";

export const UpdateUserCatalog = (catalogToAdd, jwt) => {
    return (
        Post(getURL() + "updateUserCatalog", {
            "catalogToAdd": catalogToAdd
        }, jwt)
    )
}