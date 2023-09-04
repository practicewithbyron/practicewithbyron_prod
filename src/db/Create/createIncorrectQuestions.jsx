import React from "react";
import { Post } from "../post";

export const CreateIncorrectQuestions = (userId, catalogItem, questions) => {
    return(
        Post("http://127.0.0.1:8000/api/createIncorrectQuestion", {
            userId: userId,
            catalogItem: catalogItem,
            questions: questions
        })
    )
}