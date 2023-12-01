import { getURL } from "../getURL";
import { Post } from "../post";

export const ReadCatalog = (catalogName, jwt) => {
    return (
        Post(getURL() + "readCatalog", {
            "catalogName": catalogName
        }, jwt)
    )
}