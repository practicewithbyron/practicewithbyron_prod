import axios from "axios";

export const Post = (url, body, jwt="") => {
  if (jwt){
    return(
      axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Subscription": "aef2e9fb-1f86-423a-99bd-f44f67316387",
            "Authorization": jwt
        },
    })); 
  }
  else {
    return(
      axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Subscription": "aef2e9fb-1f86-423a-99bd-f44f67316387"
        },
    })); 
  }
}