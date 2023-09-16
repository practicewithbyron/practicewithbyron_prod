import { Post } from '../post';

export const ReadAllCatalogs = () => {
    return(Post(getURL() + "readAllCatalogs", {}))
}