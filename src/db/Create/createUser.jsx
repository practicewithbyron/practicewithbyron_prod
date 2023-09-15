import { useState, useEffect } from "react";
import axios from "axios";

export const CreateUser = (userEmail, userPassword) => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    console.log(userEmail, userPassword);
  
    useEffect(() => {
      axios.post('https://practicewithbyron-python.azurewebsites.net/api/createUser', {
        email: userEmail,
        password: userPassword
      }).then(response => {
        console.log(response.data.detail);
        setData(response.data.detail);
      }).catch(error => {
        console.log(error?.response?.data);
        setError(error);
      }).finally(() => {
        setIsFetching(false);
      });
    }, [userEmail, userPassword]);
    
    console.log({ data, isFetching, error });
    return { data, isFetching, error };
}