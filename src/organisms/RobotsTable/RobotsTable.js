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
    request({ url: "http://localhost:3001/robots", json: true }, (err, res, body) => {
      if (err) console.log(err);
      else if (res.statusCode >= 400) console.log(body);
      else updateRobotData(body.robot_data || []);
      console.log(body);
    });
  };
  const saveRobot = (i, e) => {
    console.log(robot_data[i]);
    request(
      { url: "http://localhost:3001/robots", method: "PUT", body: robot_data[i], json: true },
      (err, res, body) => {
        if (err) console.log(err);
        else if (res.statusCode >= 400) console.log(body);
        else getRobots();

        console.log(body);
      }
    );
  };
  const addRow = () => {
    const data = robot_data.splice(0);
    data.push({
      edit_mode: true,
      attacks: attack_options.filter((attack) => attack.color === "red"),
      defense: 1000,
      color: "red",
    });
    updateRobotData(data);
  };
  const deleterRobot = (_id) => {
    request(
      { url: "http://localhost:3001/robots", method: "DELETE", body: { _id }, json: true },
      (err, res, body) => {
        if (err) console.log(err);
        else if (res.statusCode >= 400) console.log(body);
        else getRobots();

        console.log(body);
      }
    );
  };
  const updateName = (i, e) => {
    const updated_data = robot_data.splice(0);
    updated_data[i].name = e.target.value;
    updateRobotData(updated_data);
  };
  const updateColor = (i, e) => {
    const updated_data = robot_data.splice(0);
    updated_data[i].color = e.target.value;
    updated_data[i].attacks = attack_options.filter((attack) => attack.color === e.target.value);
    updateRobotData(updated_data);
  };

  useEffect(() => {
    getRobots();
  }, []);

  const headers = [
    { name: "Name" },
    { name: "Color" },
    { name: "Attacks" },
    { name: "Defense" },
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
        {robot_data.map((robot, i) => (
          <TableRowEditor
            {...robot}
            saveRobot={saveRobot}
            updateName={updateName}
            updateColor={updateColor}
            deleterRobot={deleterRobot}
            i={i}
            key={i}
          />
        ))}
      </tbody>
    </table>
  );
};

const TableRowEditor = ({
  name,
  color,
  attacks,
  defense,
  image,
  i,
  saveRobot,
  updateName,
  updateColor,
  deleterRobot,
  _id,
}) => {
  color = color || color_options[0];
  return (
    <tr key={i}>
      <td>{<Textbox defaultText={name} onchange={updateName.bind(this, i)} />}</td>
      <td>
        <Selector
          options={color_options}
          selected_option={color}
          onSelect={updateColor.bind(this, i)}
        />
      </td>
      <td>
        {attacks.map(({ name, points }, i) => (
          <div key={i}>
            <span>{name}</span>:<span>{points}</span>
          </div>
        ))}
      </td>
      <td>{defense}</td>
      <td>
        <div className="row">
          <div className="col">
            <ImageUpload color={color} />
          </div>
          <div className="col">
            <Button submit={saveRobot.bind(this, i, 1)}>Save</Button>
          </div>
          <div className="col">
            {_id && <Button submit={deleterRobot.bind(this, _id)}>Delete</Button>}
          </div>
        </div>
      </td>
    </tr>
  );
};
export default RobotsTable;
