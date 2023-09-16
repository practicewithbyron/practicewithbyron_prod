import { Post } from "../post";
import { getURL } from "../getURL";

export const FindIncorrectQuestionsByUser = (userId) => {
    return(
        Post(getURL()+ "readIncorrectQuestions", {
            userId: userId,
        })
    )
}