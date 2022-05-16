const { Schema, model } = require("mongoose");
const required = true;
const unique = true;

module.exports = model(
  "Robots",
  Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required },
    color: { type: String, required },
    attack: {
      name: { type: String, required },
      points: { type: String, required },
      pattern: [{ type: Number, required }],
    },
    defense: { type: Number, required },
  })
);
