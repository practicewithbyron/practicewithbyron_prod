import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const Put = (url, body) => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
  
    useEffect(() => {
      axios.put(url, body, {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Ocp-Apim-Subscription-Key": "ff1ce5d1c42047a3b1f01aeea1e5cfd7"
        }
      }).then(response => {
        setData(response.data.detail);
      }).catch(error => {
        setError(error);
      }).finally(() => {P
        setIsFetching(false);
      });
    }, [url, body]);
    
    return { data, isFetching, error };
}