import { getURL } from "../getURL";
import axios from "axios";

export const ReadCatalog = (catalogName, jwt) => {
    return (
        axios.post(getURL() + "readCatalog", 
        {
            "catalogName": catalogName
        }, 
        {
            headers: {
                "Authorization": jwt,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Ocp-Apim-Subscription-Key": "ff1ce5d1c42047a3b1f01aeea1e5cfd7"
            },
        })
    )
}