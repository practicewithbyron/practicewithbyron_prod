import production from "../production.json";
import development from "../development.json";

export const getURL = () => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    {
        return development["apiUrl"];
    }
    else 
    {
        return production["apiUrl"];
    }
}