import axios from "axios";

export const ReadAllCatalogQuestions = (catalogName, jwt) => {
    return (
        axios.post("http://127.0.0.1:8000/api/readAllCatalogQuestions", {
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