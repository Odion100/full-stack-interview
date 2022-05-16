require("dotenv").config();
const mongoose = require("mongoose");
const Robots = require("../routes/BattleArena/Robots/Robots");
const url = `mongodb+srv://odion:${process.env.MONGODB_PASSWORD}@cluster0.oehof.mongodb.net/battle-ship-space?retryWrites=true&w=majority`;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((data) => console.log("mongodb connected:-->"))
  .catch((err) => console.log("mongodb connection failed:-->", err));

const express = require("express");
const router = express.Router();
router.get("/", function (req, res, next) {
  res.send("ok!");
});

module.exports = router;
