import axios from "axios";
import { getURL } from "../getURL";

export const ReadUserCatalog = (jwt) => {
    return(
      Post(getURL() + "readUserCatalog", {}, jwt)
    )

}