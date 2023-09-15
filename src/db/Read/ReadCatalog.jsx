import { Post } from '../post';

export const ReadCatalog = (catalogName) => {
    return(
        Post("https://practicewithbyron-python.azurewebsites.net/api/readCatalog", {
            catalogName: catalogName
        })
    )
}