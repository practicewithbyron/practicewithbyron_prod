import axios from "axios";

export const Post = (url, body) => {
  return(
    axios.post(url, body,     {
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Ocp-Apim-Subscription-Key": "ff1ce5d1c42047a3b1f01aeea1e5cfd7"
      },
  }));    
}