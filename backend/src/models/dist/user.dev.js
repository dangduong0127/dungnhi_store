"use strict";

var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },
  DateOfBirth: {
    type: Date,
    required: true
  }
});
var UserModel = new mongoose.model("user", UserSchema);
module.exports = UserModel;