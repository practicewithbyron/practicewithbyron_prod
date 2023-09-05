import { Post } from './post.jsx';

export const Login = (userEmail, userPassword) => {
  return(Post("http://127.0.0.1:8000/api/login", {
    "email": userEmail,
    "password": userPassword
  }))
}