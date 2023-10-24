import Cookies from "js-cookie";

export const IsLoggedIn = (destination) => {
    const tokenFromCookie = Cookies.get('jwtToken');
    if(!tokenFromCookie){
        localStorage.setItem("destination", destination);
        window.location.href = `/login`;
    }
}