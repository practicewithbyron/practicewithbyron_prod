import axios from "axios";
import { getURL } from "../getURL";
import { Post } from "../post";

export const ReadAllCatalogQuestions = (catalogName, jwt) => {
    return (
        Post(getURL() + "readAllCatalogQuestions", {
            catalogName: catalogName
        }, jwt)
    )
}
