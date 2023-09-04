import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const Put = (url, body) => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
  
    useEffect(() => {
      axios.put(url, body).then(response => {
        console.log(response.data.detail);
        setData(response.data.detail);
      }).catch(error => {
        console.log(error?.response?.data);
        setError(error);
      }).finally(() => {
        setIsFetching(false);
      });
    }, [url, body]);
    
    console.log({ data, isFetching, error });
    return { data, isFetching, error };
}