import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";

export const NavigationBarItem = ({text, link}) => {
    return (
        <>
            <NavLink exact="true" to={link} activeClassName={"activeNavigationItem"} className="navigationItem">
                {text}
            </NavLink>
        </>
    )
}