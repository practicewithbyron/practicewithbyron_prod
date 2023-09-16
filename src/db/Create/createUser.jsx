import { useState, useEffect } from "react";
import { getURL } from "../getURL";
import axios from "axios";

export const CreateUser = (userEmail, userPassword) => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
  
    useEffect(() => {
      axios.post(getURL() + 'createUser', {
        email: userEmail,
        password: userPassword
      }).then(response => {
        setData(response.data.detail);
      }).catch(error => {
        setError(error);
      }).finally(() => {
        setIsFetching(false);
      });
    }, [userEmail, userPassword]);
    
    return { data, isFetching, error };
}