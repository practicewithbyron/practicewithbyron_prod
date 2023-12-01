import { Post } from "../post";
import { getURL } from "../getURL";

export const ReadUserCatalog = (jwt) => {
    return(
      Post(getURL() + "readUserCatalog", {}, jwt)
    )

}