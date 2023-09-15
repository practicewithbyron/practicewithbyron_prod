import axios from "axios";


export const ReadUserCatalog = (jwt) => {
    console.log(typeof(jwt));
    return(
        axios.post("https://practicewithbyron-python.azurewebsites.net/api/readUserCatalog", null, {
            headers: {
              "Authorization": jwt,
              'Content-Type': 'application/json',
            },
          })
    )

}