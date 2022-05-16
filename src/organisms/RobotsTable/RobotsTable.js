import React, { useState, useEffect } from "react";
import request from "request";
import Textbox from "../../atoms/Textbox/Textbox";
import Button from "../../atoms/Botton/Button";
import Selector from "../../atoms/Selector/Selector";
import ImageUpload from "../../atoms/ImageUpload/ImageUpload";
import "./styles.scss";
import { color_options, attack_options } from "../../App.config";
const RobotsTable = () => {
  const [robot_data, updateRobotData] = useState([]);

  const getRobots = () => {
    request({ url: "http://localhost:3001/robots" }, (err, res, body) => {
      if (err) console.log(err);
      else if (res.statusCode >= 400) console.log(body);
      else updateRobotData(body.robot_data || []);
      console.log(body);
    });
  };
  const saveRobot = (i, e) => {
    request(
      { url: "http://localhost:3001/robots", method: "PUT", body: robot_data[i] },
      (err, res, body) => {
        if (err) console.log(err);
        else if (res.statusCode >= 400) console.log(body);
        else updateRobotData(body.robot_data || []);
        console.log(body);
      }
    );
  };
  const addRow = () => {
    const data = [{ edit_mode: true, attacks: [], defence: 1000 }, ...robot_data];
    updateRobotData(data);
  };

  useEffect(() => {
    getRobots();
  }, []);

  const headers = [
    { name: "Name" },
    { name: "Color" },
    { name: "Attacks" },
    { name: "Defence" },
    { name: <Button submit={addRow}>Add Robot</Button> },
  ];
  console.log("robot data", robot_data);
  return (
    <table className={`data-table`}>
      <thead>
        <tr>
          {headers.map(({ name }, i) => (
            <th key={i}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {robot_data.map((robot, i) =>
          robot.edit_mode ? (
            <TableRowEditor {...robot} saveRobot={saveRobot} key={i} />
          ) : (
            <TableRow {...robot} key={i} />
          )
        )}
      </tbody>
    </table>
  );
};

const TableRow = ({ name, color, attacks, defence, image, i }) => (
  <tr key={i}>
    <td>{name}</td>
    <td>{color}</td>
    <td>
      {attacks.map(({ name, points }, i) => (
        <div key={i}>
          <span>{name}</span>:<span>{points}</span>
        </div>
      ))}
    </td>
    <td>{defence}</td>
    <td>
      <img src={image} alt="Robot" />
    </td>
  </tr>
);
const TableRowEditor = ({ name, color, attacks, defence, image, i, saveRobot }) => {
  color = color || color_options[0];
  return (
    <tr key={i}>
      <td>{<Textbox />}</td>
      <td>
        <Selector
          options={color_options}
          selected_option={color}
          onSelect={saveRobot.bind(this, i, 1)}
        />
      </td>
      <td>
        {attack_options
          .filter((attack) => attack.color === color)
          .map(({ name, points }, i) => (
            <div key={i}>
              <span>{name}</span>:<span>{points}</span>
            </div>
          ))}
      </td>
      <td>{defence}</td>
      <td>
        <div className="row">
          <div className="col">
            <ImageUpload />
          </div>
          <div className="col">
            <Button submit={console.log}>Save</Button>
          </div>
        </div>
      </td>
    </tr>
  );
};
export default RobotsTable;
