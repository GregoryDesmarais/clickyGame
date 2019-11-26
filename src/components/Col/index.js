import React from "react";

function Col(props) {
  return (
    <div className={props.class}>
      {props.children}
    </div>
  )
}

export default Col;
