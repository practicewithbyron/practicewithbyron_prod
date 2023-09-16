import axios from "axios";
import { getURL } from "../getURL";

export const ReadUserCatalog = (jwt) => {
    return(
        axios.post(getURL() + "readUserCatalog", null, {
            headers: {
              "Authorization": jwt,
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              "Ocp-Apim-Subscription-Key": "ff1ce5d1c42047a3b1f01aeea1e5cfd7"
            },
          })
    )

}