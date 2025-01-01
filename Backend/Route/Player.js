const express = require("express");
const { players } = require("../Controller/ListController");
const router = express.Router();

router.get("/",players);

module.exports = router