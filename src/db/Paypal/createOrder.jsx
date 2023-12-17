import { getURL } from "../getURL";
import { Post } from "../post";

export const CreateOrder = (value) => {
    return(
        Post(getURL() + "orders", JSON.stringify({
            value: value
        }))
    )
}