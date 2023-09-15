import { Post } from './post.jsx';

export const Login = (userEmail, userPassword) => {
  return(Post("https://practicewithbyron-python.azurewebsites.net/api/login", {
    "email": userEmail,
    "password": userPassword
  }))
}