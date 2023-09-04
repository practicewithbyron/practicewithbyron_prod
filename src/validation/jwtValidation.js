import React from "react";
import jwtDecode from "jwt-decode";

export const JWTValidation = (jwtToken) => {

    if(!jwtToken){
        return false;
    }

    const decodedToken = jwtDecode(jwtToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        // Token has expired
        return false;
    } else {
        // Token is still valid
        return true;
    }
}