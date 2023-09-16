import { Post } from '../post';
import { getURL } from "../getURL";

export const ReadCatalog = (catalogName) => {
    return(
        Post(getURL() + "readCatalog", {
            catalogName: catalogName
        })
    )
}