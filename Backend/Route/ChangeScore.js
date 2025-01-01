const express = require("express");
const { ScoreChange } = require("../Controller/ScoreController");
const router = express.Router();

router.post("/" , ScoreChange)

module.exports = router