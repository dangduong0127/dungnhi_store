const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");
const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
// router.get("/", (req, res) => {
//   res.send("Trang chủ");
// });
// router.post("/v1/testapi", (req, res) => {
//   return res.status(200).json({
//     message: "API test thành công",
//   });
// });

router.use("/users", userRoutes);
router.use("/home", homeRoutes);
router.use("/products", productRoutes);

module.exports = router;
