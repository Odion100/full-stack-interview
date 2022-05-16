require("dotenv").config();
const mongoose = require("mongoose");
const Robots = require("./Robots/Robots")();
const url = `mongodb+srv://odion:${process.env.MONGODB_PASSWORD}@cluster0.oehof.mongodb.net/battle-ship-space?retryWrites=true&w=majority`;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((data) => console.log("mongodb connected:-->"))
  .catch((err) => console.log("mongodb connection failed:-->", err));

const express = require("express");
const router = express.Router();

router.get("/robots", function (req, res, next) {
  const { query } = req;
  Robots.find(query, (error, results) => {
    if (error) {
      error.status = error.status || 500;
      res.status(error.status).json(error);
    } else res.json(results);
  });
});
router.put("/robots", function (req, res, next) {
  const { body } = req;
  const cb = (error, results) => {
    if (error) {
      error.status = error.status || 500;
      res.status(error.status).json(error);
    } else res.json(results);
  };

  if (body._id) Robots.update(body, cb);
  else Robots.add(body);
});

router.delete("/robots", function (req, res, next) {
  const { body } = req;
  Robots.find(body, (error, results) => {
    if (error) {
      error.status = error.status || 500;
      res.status(error.status).json(error);
    } else res.json(results);
  });
});
module.exports = router;
