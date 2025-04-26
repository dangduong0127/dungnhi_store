"use strict";

var express = require("express");

var router = express.Router();

var userRoutes = require("./user.route");

var homeRoutes = require("./home.route"); // router.get("/", (req, res) => {
//   res.send("Trang chủ");
// });
// router.post("/v1/testapi", (req, res) => {
//   return res.status(200).json({
//     message: "API test thành công",
//   });
// });


router.use("/users", userRoutes);
router.use("/home", homeRoutes);
module.exports = router;