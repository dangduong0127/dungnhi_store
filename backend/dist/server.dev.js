"use strict";

var express = require("express");

var app = express();

require("dotenv").config();

var router = require("./src/routes");

var _require = require("./src/config"),
    connectDB = _require.connectDB;

var port = process.env.PORT;
app.use("/api", router);
connectDB();
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});