const express = require("express");
const { authUser } = require("../Controller/UserController");
const router = express.Router();

router.post("/",authUser);

module.exports = router;