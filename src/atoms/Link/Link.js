import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const myLink = ({ link, text }) => {
  return (
    <Link className="link" to={link}>
      {text}
    </Link>
  );
};

export default myLink;
