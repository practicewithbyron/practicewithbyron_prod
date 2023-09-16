import axios from "axios";
import { getURL } from "../getURL";

export const ReadUserCatalog = (jwt) => {
    return(
        axios.post(getURL() + "readUserCatalog", null, {
            headers: {
              "Authorization": jwt,
              'Content-Type': 'application/json',
            },
          })
    )

}