import React, { useState, useEffect } from "react";
import request from "request";
import Textbox from "../../atoms/Textbox/Textbox";
import Button from "../../atoms/Botton/Button";
import Selector from "../../atoms/Selector/Selector";
import ImageUpload from "../../atoms/ImageUpload/ImageUpload";
import Link from "../../atoms/Link/Link";
import "./styles.scss";
import { color_options, attack_options } from "../../App.config";
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const RobotsTable = () => {
  const [robot_data, setRobotData] = useState([]);
  const [selected_bots, setSelectedBots] = useState([]);

  const getRobots = () => {
    request({ url: "http://localhost:3001/robots", json: true }, (err, res, body) => {
      if (err) console.log(err);
      else if (res.statusCode >= 400) console.log(body);
      else setRobotData(body.robot_data || []);
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
      defense: 1000 + randomIntFromInterval(500, 1000),
      color: "red",
    });
    setRobotData(data);
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
    setRobotData(updated_data);
  };
  const updateColor = (i, e) => {
    const updated_data = robot_data.splice(0);
    updated_data[i].color = e.target.value;
    updated_data[i].attacks = attack_options.filter((attack) => attack.color === e.target.value);
    updated_data[i].defense = 1000 + randomIntFromInterval(500, 1000);
    setRobotData(updated_data);
  };
  const selectBot = (i, e) => {
    const updated_data = robot_data.splice(0);
    updated_data[i].selected = !updated_data[i].selected;
    setRobotData(updated_data);
    const selected = updated_data.filter(({ selected }) => selected);
    setSelectedBots(selected);
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
  console.log("robot data", robot_data, selected_bots);

  return (
    <div className="robot-table">
      <div className="robot-table__battle-link">
        {selected_bots.length === 2 && (
          <Link
            link={`/battle-arena/${selected_bots[0]._id}/${selected_bots[1]._id}`}
            text={"Battle!"}
          />
        )}
      </div>
      <table className={`robot-table__table`}>
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
              selectBot={selectBot}
              i={i}
              key={i}
            />
          ))}
        </tbody>
      </table>
    </div>
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
  selectBot,
  _id,
  seleted,
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
          <div className="col">
            <input type="checkbox" defaultChecked={seleted} onChange={selectBot.bind(this, i)} />
          </div>
        </div>
      </td>
    </tr>
  );
};
export default RobotsTable;
