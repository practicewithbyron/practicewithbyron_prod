import React from "react";
import { Post } from "../post";

export const FindIncorrectQuestionsByUser = (userId) => {
    return(
        Post("http://127.0.0.1:8000/api/readIncorrectQuestions", {
            userId: userId,
        })
    )
}