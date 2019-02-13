import React from "react";

const Button = ({ onClick, title }) => (
  <div className="button" onClick={onClick}>
    <span className="button_title">{title}</span>
  </div>
);

export default Button;
