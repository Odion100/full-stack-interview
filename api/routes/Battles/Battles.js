const BattlesModel = require("./Battles.model");
const { Types } = require("mongoose");

module.exports = function Battles(model = BattlesModel) {
  const Battles = {};

  Battles.find = (data, cb) => {
    model
      .find(null)
      .then((battles) => {
        if (battles.length > 0) cb(null, { battles, status: 200 });
        else cb({ message: "Battles not found", status: 404 });
      })
      .catch((error) => cb({ ...error, message: "Battles not found", status: 404 }));
  };

  Battles.add = (data, cb) => {
    new model({ _id: Types.ObjectId(), ...data })
      .save()
      .then((new_battle) =>
        cb(null, { new_battle, status: 200, message: "New Battle created successfully." })
      )
      .catch((error) => cb({ error, status: 400, message: "Failed to create new Battle" }));
  };

  return Battles;
};
