"use strict";

var User = require("../models/user");

exports.findAll = function () {
  return User.find();
};