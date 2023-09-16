import { Post } from "../post";

export const FindIncorrectQuestionsByUser = (userId) => {
    return(
        Post(getURL()+ "readIncorrectQuestions", {
            userId: userId,
        })
    )
}