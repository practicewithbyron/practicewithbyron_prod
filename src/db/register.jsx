import { Post } from './post.jsx';

export const Register = (userEmail, userPassword) => {
  return(Post(getURL() + "register", {
    "email": userEmail,
    "password": userPassword
  }))
}