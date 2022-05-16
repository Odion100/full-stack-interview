const RobotsModel = require("./Robots.model");
const { Types } = require("mongoose");

module.exports = function Robots(model = RobotsModel) {
  const robots = {};

  robots.find = ({ _id }, cb) => {
    const data = _id ? { _id } : null;
    model
      .find(data)
      .then((robot_data) => {
        if (robot_data) cb(null, { robot_data, status: 200 });
        else cb({ message: "robot_data not found", status: 404 });
      })
      .catch((error) => cb(error));
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
    if (!_id) return cb({ status: 404, message: "Invalid options:)_id missing" });
    model
      .deleteOne({ _id })
      .then((doc) => cb(null, { status: 200 }))
      .catch((error) => cb(error));
  };

  robots.update = (data, cb) => {
    const { _id } = data;
    if (!_id) return cb({ status: 404, message: "Invalid options:)_id missing" });
    model
      .findAndReplace({ _id }, data)
      .then((update_robot) => cb(null, { update_robot, status: 200 }))
      .catch((error) => cb(error));
  };

  return robots;
};
