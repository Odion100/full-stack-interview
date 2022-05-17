import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useParams } from "react-router-dom";
import request from "request";
import ImageUpload from "../../atoms/ImageUpload/ImageUpload";
import Button from "../../atoms/Botton/Button";
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const BattleArena = () => {
  const { robot1, robot2 } = useParams();
  const [robots, setRobots] = useState([]);
  const [robot1_attacks, setR1Attacks] = useState([]);
  const [robot2_attacks, setR2Attacks] = useState([]);
  const [robot1_defense, setR1Defense] = useState(0);
  const [robot2_defense, setR2Defense] = useState(0);
  const [records, setRecords] = useState([]);
  const [results, setresults] = useState({
    robot1: {},
    robot2: {},
    winner: "",
  });
  const getRecords = () => {
    request({ url: `http://localhost:3001/battles`, json: true }, (err, res, body) => {
      if (err) console.log(err);
      else if (res.statusCode >= 400) console.log(body);
      else {
        setRecords(body.battles);
      }
      console.log(body);
    });
  };
  const getRobots = () => {
    request(
      { url: `http://localhost:3001/robots?ids=${robot1},${robot2}`, json: true },
      (err, res, body) => {
        if (err) console.log(err);
        else if (res.statusCode >= 400) console.log(body);
        else {
          const bots = body.robot_data || [];
          setRobots(bots);
          if (bots.length === 2) {
            setR1Defense(bots[0].defense);
            setR2Defense(bots[1].defense);
          }
        }
        console.log(body);
      }
    );
  };
  const saveBattle = (battle_summary) => {
    request(
      { url: `http://localhost:3001/battles`, method: "PUT", body: battle_summary, json: true },
      (err, res, body) => {
        if (err) console.log(err);
        else if (res.statusCode >= 400) console.log(body);
        else getRecords();
        console.log(body);
      }
    );
  };

  const runBattle = (r1 = robots[0], r2 = robots[1]) => {
    const battle_summary = {
      robot1: robots[0],
      robot2: robots[1],
      winner: ["robot1", "robot2"][randomIntFromInterval(0, 1)],
    };

    setresults(battle_summary);
    console.log(battle_summary);
    saveBattle(battle_summary);
    getRecords();
  };

  useEffect(() => {
    getRobots();
    getRecords();
  }, [robot1, robot2]);

  console.log(robots);
  return (
    <section className="battle-arena">
      <div className="container">
        <div className="row">
          <div className="col-3">
            {robots.length === 2 && (
              <>
                <div className="row">
                  <span>Robot1:{robots[0].name}</span>
                  <span>Color:{robots[0].color}</span>
                </div>
                <div className="row">
                  <ImageUpload color={robots[0].color} />
                </div>
                <div className="row">
                  <span>HP:{robot1_defense}</span>
                </div>
              </>
            )}
          </div>
          <div className="col-3">
            <div>
              {" "}
              <Button submit={runBattle}>Fight!</Button>
            </div>
            <div>
              <span>Winner:{results.winner}</span>
            </div>
          </div>
          <div className="col-3">
            {robots.length === 2 && (
              <>
                <div className="row">
                  <span>Robot2:{robots[1].name}</span>
                  <span>Color:{robots[1].color}</span>
                </div>
                <div className="row">
                  <ImageUpload color={robots[1].color} />
                </div>
                <div className="row">
                  <span>HP:{robot2_defense}</span>
                </div>
              </>
            )}
          </div>
          <div className="col-3">
            {records.map(({ robot1, robot2, winner }, i) => (
              <div key={i} style={{ border: "1px solid" }}>
                <div>
                  <span>Robot 1: {robot1.name}</span>
                </div>
                <div>
                  <span>Robot 2: {robot2.name}</span>
                </div>
                <div>
                  <span>Winner: {winner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default BattleArena;
