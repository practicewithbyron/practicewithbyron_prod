import axios from "axios";
import { getURL } from "../getURL";

export const ReadAllCatalogQuestions = (catalogName, jwt) => {
    return (
        axios.post(getURL() + "readAllCatalogQuestions", {
            catalogName: catalogName
        }, 
        {
            headers: {
                "Authorization": jwt,
                'Content-Type': 'application/json',
            },
        })
    )
}