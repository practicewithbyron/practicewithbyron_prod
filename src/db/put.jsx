import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const Put = (url, body) => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
  
    useEffect(() => {
      axios.put(url, body).then(response => {
        setData(response.data.detail);
      }).catch(error => {
        setError(error);
      }).finally(() => {
        setIsFetching(false);
      });
    }, [url, body]);
    
    return { data, isFetching, error };
}