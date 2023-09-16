import axios from "axios";


export const ReadUserCatalog = (jwt) => {
    console.log(typeof(jwt));
    return(
        axios.post(getURL() + "readUserCatalog", null, {
            headers: {
              "Authorization": jwt,
              'Content-Type': 'application/json',
            },
          })
    )

}