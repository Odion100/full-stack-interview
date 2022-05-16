const RobotsModel = require("./Robots.model");
const { Types } = require("mongoose");

module.exports = function Robots(model = RobotsModel) {
  const robots = {};

  robots.find = (data, cb) => {};

  robots.add = (data, cb) => {
    new model({ _id: Types.ObjectId(), ...data })
      .save()
      .then((new_robot) =>
        cb(null, { new_robot, status: 200, message: "New robot created successfully." })
      )
      .catch((error) => cb({ error, status: 400, message: "Failed to create new robot" }));
  };

  robots.delete = (data, cb) => {};

  robots.update = (data, cb) => {};

  return robots;
};
