import { Post } from "../post";
import { getURL } from "../getURL";

export const CreateIncorrectQuestions = (userId, catalogItem, questions) => {
    return(
        Post(getURL() + "createIncorrectQuestion", {
            userId: userId,
            catalogItem: catalogItem,
            questions: questions
        })
    )
}