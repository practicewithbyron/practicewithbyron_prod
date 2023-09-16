import production from "../production.json";
import development from "../development.json";

export const getURL = () => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    {
        console.log("Running in development environment");
        return development["apiUrl"];
    }
    else 
    {
        console.log("Running in production environment");
        return production["apiUrl"];
    }
}