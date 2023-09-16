import axios from "axios";
import { getURL } from "./getURL";
import { Post } from "./post";

export const Login = (userEmail, userPassword) => {
  return (
    Post(getURL() + "login", {
      "email": userEmail,
      "password": userPassword
    })
  );
}