import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useParams } from "react-router-dom";
import request from "request";
import ImageUpload from "../../atoms/ImageUpload/ImageUpload";

const BattleArena = () => {
  const { robot1, robot2 } = useParams();
  const [robots, setRobots] = useState([]);
  const getRobots = () => {
    request(
      { url: `http://localhost:3001/robots?ids=${robot1},${robot2}`, json: true },
      (err, res, body) => {
        if (err) console.log(err);
        else if (res.statusCode >= 400) console.log(body);
        else setRobots(body.robot_data || []);
        console.log(body);
      }
    );
  };

  useEffect(() => {
    getRobots();
  }, [robot1, robot2]);

  console.log(robots);
  return (
    <section className="battle-arena">
      <div className="container">
        <div className="row">
          <div className="col-4">
            {robots.length === 2 && (
              <>
                <div>
                  <span>Name:{robots[0].name}</span>
                  <span>Color:{robots[0].color}</span>
                </div>
                <div>
                  <ImageUpload color={robots[0].color} />
                </div>
              </>
            )}
          </div>
          <div className="col-4">{robot2}</div>
          <div className="col-4">{robot2}</div>
        </div>
      </div>
    </section>
  );
};
export default BattleArena;
