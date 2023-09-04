import React from "react";
import { Post } from './post.jsx';

export const Register = (userEmail, userPassword) => {
  return(Post("http://127.0.0.1:8000/api/register", {
    "email": userEmail,
    "password": userPassword
  }))
}