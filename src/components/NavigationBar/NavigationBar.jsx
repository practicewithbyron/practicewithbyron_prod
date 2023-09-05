import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { JWTValidation } from "../../validation/jwtValidation.js";
import { NavigationBarItem } from "./NavigationBarItem";

import Cookies from "js-cookie";

import "./NavigationBar.css";
import "../../App.css";

export const NavigationBar = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    const tokenFromCookie = Cookies.get('jwtToken');

    //Prevent infinite re-renders
    useEffect(() => {
        if(tokenFromCookie || JWTValidation(tokenFromCookie)){
            setLoggedIn(true);
        }
    }, [tokenFromCookie])

    //If logged in 
    if(loggedIn){
        return (
            <div className="flex-row" style={{position: "fixed", minWidth: "100vw", zIndex: "99", background: "var(--light-text)"}}>
                <NavLink to="/" style={{marginRight: "auto",fontWeight: "400", marginLeft: "0 !important", padding: "15px 30px", background:"var(--primary-color)"}}>
                    <h3 style={{color: "var(--light-text)"}}>Practice With Byron</h3>
                </NavLink>
                <div className="flex-row" style={{marginRight: "10px"}}>
                    <NavigationBarItem text="Dashboard" link="/dashboard"/>
                    <NavigationBarItem text="Catalog" link="/catalog"/>
                    <NavLink exact="true" to={"/login"} activeClassName={"activeNavigationItem"} className="navigationItem" onClick={() => {
                        setLoggedIn(false);
                        Cookies.remove("jwtToken");

                    }}>
                        Logout
                    </NavLink>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="flex-row" style={{position: "fixed", minWidth: "100vw", zIndex: "99", background: "var(--light-text)"}}>
                <NavLink to="/" style={{marginRight: "auto",fontWeight: "400", marginLeft: "0 !important", padding: "15px 30px", background:"var(--primary-color)"}}>
                    <h3 style={{color: "var(--light-text)"}}>Practice With Byron</h3>

                </NavLink>
                <div className="flex-row" style={{marginRight: "10px"}}>
                    <NavigationBarItem text="Dashboard" link="/dashboard"/>
                    <NavigationBarItem text="Catalog" link="/catalog"/>
                    <NavigationBarItem text="Login" link="/login"/>
                </div>
            </div>
        )
    }

}