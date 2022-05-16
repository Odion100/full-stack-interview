import React, { useState, useEffect } from "react";
import "./styles.scss";
import RobotsTable from "../../organisms/RobotsTable/RobotsTable";
import request from "request";

const Home = (props) => {
  const [robot_data, updateRobotData] = useState([]);

  useEffect(() => {
    console.log("1234--------");
    request({ url: "http://localhost:3001/robots" }, (err, res, body) => {
      if (err) console.log(err);
      else if (res.statusCode >= 400) console.log(body);
      else updateRobotData(body.robot_data);
      console.log(body);
    });
  }, []);

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
