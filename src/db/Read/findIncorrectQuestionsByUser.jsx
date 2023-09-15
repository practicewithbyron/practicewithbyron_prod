import { Post } from "../post";

export const FindIncorrectQuestionsByUser = (userId) => {
    return(
        Post("https://practicewithbyron-python.azurewebsites.net/api/readIncorrectQuestions", {
            userId: userId,
        })
    )
}