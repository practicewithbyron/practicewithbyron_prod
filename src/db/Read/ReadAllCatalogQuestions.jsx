import axios from "axios";

export const ReadAllCatalogQuestions = (catalogName, jwt) => {
    return (
        axios.post("https://practicewithbyron-python.azurewebsites.net/api/readAllCatalogQuestions", {
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