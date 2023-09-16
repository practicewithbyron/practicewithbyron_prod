import { Post } from "../post";

export const CreateIncorrectQuestions = (userId, catalogItem, questions) => {
    return(
        Post(getURL() + "createIncorrectQuestion", {
            userId: userId,
            catalogItem: catalogItem,
            questions: questions
        })
    )
}