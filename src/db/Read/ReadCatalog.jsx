import { getURL } from "../getURL";
import axios from "axios";

export const ReadCatalog = (catalogName, jwt) => {
    return (
        Post(getURL() + "readCatalog", {
            "catalogName": catalogName
        }, jwt)
    )
}