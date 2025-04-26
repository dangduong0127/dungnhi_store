const User = require("../models/user");

exports.findAll = () => User.find();
