import { Post } from '../post';

export const ReadAllCatalogs = () => {
    return(Post("https://practicewithbyron-python.azurewebsites.net/api/readAllCatalogs", {}))
}