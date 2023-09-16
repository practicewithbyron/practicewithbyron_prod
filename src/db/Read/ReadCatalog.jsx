import { Post } from '../post';

export const ReadCatalog = (catalogName) => {
    return(
        Post(getURL() + "readCatalog", {
            catalogName: catalogName
        })
    )
}