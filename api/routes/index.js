const express = require("express");
const router = express.Router();
const { Robots } = require("../BattleShipSpace");
router.get("/", function (req, res, next) {
  res.send("ok!");
});

module.exports = router;
