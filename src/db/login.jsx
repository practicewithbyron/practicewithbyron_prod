import axios from "axios";

export const Login = (userEmail, userPassword) => {
  return (
    axios.post("https://practicewithbyron-python.azurewebsites.net/PracticeWithByron-python/v1.0.0/login", {
      "email": userEmail,
      "password": userPassword
    }, 
    {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
    })
)
}