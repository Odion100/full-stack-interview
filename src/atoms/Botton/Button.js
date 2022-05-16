import React from "react";
import "./styles.scss";

const Button = ({ link, children, submit }) => {
  return (
    <a href={`${link ? link : "#"}`} className="button" onClick={submit}>
      {children}
    </a>
  );
};

export default Button;
