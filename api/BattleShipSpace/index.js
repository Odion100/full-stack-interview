require("dotenv").config();
const mongoose = require("mongoose");
const Robots = require("./Robots/Robots");
console.log("passwork ---------->", process.env.MONGODB_PASSWORD);
mongoose
  .connect(
    `mongodb+srv://odion:${process.env.MONGODB_PASSWORD}@cluster0.oehof.mongodb.net/battle-ship-space?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((data) => console.log("mongodb connected:-->"))
  .catch((err) => console.log("mongodb connection failed:-->", err));

module.exports = { Robots };
//mongodb+srv://odion:<password>@cluster0.oehof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//${process.env.MONGODB_PASSWORD}
