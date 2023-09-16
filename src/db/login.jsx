import axios from "axios";

export const Login = (userEmail, userPassword) => {
  return (
    axios.post("https://practicewithbyronpython-api.azure-api.net/PracticeWithByron-python/v1.0.0/login", {
      "email": userEmail,
      "password": userPassword
    }, 
    {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Ocp-Apim-Subscription-Key": "ff1ce5d1c42047a3b1f01aeea1e5cfd7"
        },
    })
)
}