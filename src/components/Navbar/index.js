import React from "react";
import "./style.css";

function Navbar(props) {
  return (
  <div className="bg-dark">
    {props.children}
  </div>
  )
}

export default Navbar;
