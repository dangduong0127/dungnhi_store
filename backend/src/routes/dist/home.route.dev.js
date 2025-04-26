"use strict";

var express = require("express");

var router = express.Router();

var homeController = require("../controllers/home.controller");

router.get("/", homeController.getHome);
module.exports = router;