import { Post } from "../post";

export const CreateIncorrectQuestions = (userId, catalogItem, questions) => {
    return(
        Post("https://practicewithbyron-python.azurewebsites.net/api/createIncorrectQuestion", {
            userId: userId,
            catalogItem: catalogItem,
            questions: questions
        })
    )
}