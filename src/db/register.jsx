import { Post } from './post.jsx';

export const Register = (userEmail, userPassword) => {
  return(Post("https://practicewithbyron-python.azurewebsites.net/api/register", {
    "email": userEmail,
    "password": userPassword
  }))
}