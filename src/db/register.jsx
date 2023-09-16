import { Post } from './post.jsx';
import { getURL } from "./getURL";

export const Register = (userEmail, userPassword) => {
  return(Post(getURL() + "register", {
    "email": userEmail,
    "password": userPassword
  }))
}