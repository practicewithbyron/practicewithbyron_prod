import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { JWTValidation } from "../../validation/jwtValidation.js";
import { NavigationBarItem } from "./NavigationBarItem";

import Cookies from "js-cookie";
import BurgerMenuIcon from "./burgerMenuIcon.jsx";

import "./NavigationBar.css";
import "../../App.css";


const defaultNavLinks = () => {
    return (
        <>
            <NavigationBarItem text="Dashboard" link="/dashboard"/>
            <NavigationBarItem text="Catalog" link="/catalog"/>
            <NavigationBarItem text="Contact" link="/contact"/>
        </>
    )
}

const PWBTitle = () => {
    return (
        <NavLink className="navigationBar-title" to="/">
            <h3 style={{color: "var(--light-text)"}}>Practice With Byron</h3>
        </NavLink>
    )
}

export const NavigationBar = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    const tokenFromCookie = Cookies.get('jwtToken');

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.outerWidth);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

    //Prevent infinite re-renders
    useEffect(() => {
        if(tokenFromCookie || JWTValidation(tokenFromCookie)){
            setLoggedIn(true);
        }
    }, [tokenFromCookie])
     

    if(windowWidth < 700){
        if(loggedIn){
            return (
                <div className="flex-column navigationBar-container navigationBurgerBar-container">
                    <div className="flex-row navigationBarLinks-container burgerMenuIcon-container">
                        <BurgerMenuIcon setBurgerMenuOpen={setBurgerMenuOpen} burgerMenuOpen={burgerMenuOpen}/>
                    </div>
                    {
                        burgerMenuOpen ? (
                            <div className="flex-column burgerMenu-container" onClick={() => {
                                setBurgerMenuOpen(false);
                            }}>
                                <NavigationBarItem text="Home" link="/"/>
                                {
                                    defaultNavLinks()
                                }
                                <NavLink exact="true" to={"/login"} activeClassName={"activeNavigationItem"} className="navigationItem" onClick={() => {
                                    setLoggedIn(false);
                                    Cookies.remove("jwtToken");
                                }}>
                                    Logout
                                </NavLink>
                            </div>
                        ) : (
                            <>
                            </>
                        )
                    }
                </div>
            )
        }
        else{
            return (
                <div className="flex-column navigationBar-container navigationBurgerBar-container">
                    <div className="flex-row">
                        <div className="flex-row navigationBarLinks-container burgerMenuIcon-container">
                            <BurgerMenuIcon setBurgerMenuOpen={setBurgerMenuOpen} burgerMenuOpen={burgerMenuOpen}/>
                        </div>
                    </div>
                    {
                        burgerMenuOpen ? (
                            <div className="flex-column burgerMenu-container" onClick={() => {
                                setBurgerMenuOpen(false);
                            }}>
                                <NavigationBarItem text="Home" link="/"/>
                                {
                                    defaultNavLinks()
                                }
                                <NavigationBarItem text="Login" link="/login"/>
                            </div>
                        ) : (
                            <>
                            </>
                        )

                    }
                </div>
            )
        }
    }
    else{
        //If logged in 
        if(loggedIn){
            return (
                <div className="flex-row navigationBar-container">
                    {
                        PWBTitle()
                    }
                    <div className="flex-row navigationBarLinks-container">
                        {
                            defaultNavLinks()
                        }
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
                <div className="flex-row navigationBar-container">
                    {
                        PWBTitle()
                    }
                    <div className="flex-row navigationBarLinks-container">
                        {
                            defaultNavLinks()
                        }
                        <NavigationBarItem text="Login" link="/login"/>
                    </div>
                </div>
            )
        }
    }



}