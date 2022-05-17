const RobotsModel = require("./Robots.model");
const { Types } = require("mongoose");

module.exports = function Robots(model = RobotsModel) {
  const robots = {};

  robots.find = ({ _id, ids }, cb) => {
    const query = _id ? { _id } : ids ? { _id: { $in: ids.split(",") } } : null;
    console.log(query, _id, ids);
    model
      .find(query)
      .then((robot_data) => {
        if (robot_data.length > 0) cb(null, { robot_data, status: 200 });
        else cb({ message: "robots not found", status: 404 });
      })
      .catch((error) => cb({ ...error, message: "robots not found", status: 404 }));
  };

  robots.add = (data, cb) => {
    new model({ _id: Types.ObjectId(), ...data })
      .save()
      .then((new_robot) =>
        cb(null, { new_robot, status: 200, message: "New robot created successfully." })
      )
      .catch((error) => cb({ error, status: 400, message: "Failed to create new robot" }));
  };

  robots.delete = (data, cb) => {
    const { _id } = data;
    if (!_id) return cb({ status: 400, message: "Invalid options:_id missing" });
    model
      .deleteOne({ _id })
      .then((doc) => cb(null, { status: 200 }))
      .catch((error) => cb(error));
  };

  robots.update = async (data, cb) => {
    const { _id, name, color, attacks, defense } = data;
    if (!_id) return cb({ status: 404, message: "Invalid options:)_id missing" });
    const robot = await model.findById(_id);

    if (!robot) cb({ message: "robot not found", status: 404 });
    robot.name = name;
    robot.color = color;
    robot.attacks = attacks;
    robot.defense = defense;
    robot
      .save()
      .then((update_robot) => cb(null, { update_robot, status: 200 }))
      .catch((error) => cb(error));
  };

  return robots;
};
