import React from "react";

function BurgerMenuIcon({setBurgerMenuOpen, burgerMenuOpen}) {
  return (
    <svg onClick={() => {
        setBurgerMenuOpen(!burgerMenuOpen);
    }}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#ffffff"
        strokeLinecap="round"
        strokeWidth="2"
        d="M4 18h16M4 12h16M4 6h16"
      ></path>
    </svg>
  );
}

export default BurgerMenuIcon;