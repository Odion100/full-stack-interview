import React, { useState, useEffect } from "react";
import "./styles.scss";
import RobotsTable from "../../organisms/RobotsTable/RobotsTable";
import request from "request";

const Home = (props) => {
  return (
    <section className="home">
      <div className="container">
        <span> testing</span>
        <RobotsTable />
      </div>
    </section>
  );
};
export default Home;
