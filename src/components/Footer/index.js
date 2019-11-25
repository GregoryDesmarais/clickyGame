import React from "react";
import "./style.css";

function Footer(props) {
  return (
    <div>
      <span>Score: {props.score} | High Score: {props.highScore}</span>
      <div onClick={() => props.resetGame()}>{props.feedback}</div>
    </div>
  )
}

export default Footer;
