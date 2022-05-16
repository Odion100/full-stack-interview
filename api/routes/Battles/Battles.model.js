const { Schema, model } = require("mongoose");
const required = true;

module.exports = model(
  "battles",
  Schema({
    _id: Schema.Types.ObjectId,
    robot1: {
      _id: Schema.Types.ObjectId,
      name: { type: String, required },
    },
    robot2: {
      _id: Schema.Types.ObjectId,
      name: { type: String, required },
    },
    winner: { type: String, required },
  })
);
