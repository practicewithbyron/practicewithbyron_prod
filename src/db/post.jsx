import axios from "axios";

export const Post = (url, body) => {
  return(
    axios.post(url, body)
  );    
}