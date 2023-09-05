import axios from "axios";


export const ReadUserCatalog = (jwt) => {
    console.log(typeof(jwt));
    return(
        axios.post("http://127.0.0.1:8000/api/readUserCatalog", null, {
            headers: {
              "Authorization": jwt,
              'Content-Type': 'application/json',
            },
          })
    )

}