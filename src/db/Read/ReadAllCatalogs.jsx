import { Post } from '../post';
import { getURL } from "../getURL";

export const ReadAllCatalogs = () => {
    return(Post(getURL() + "readAllCatalogs", {}))
}