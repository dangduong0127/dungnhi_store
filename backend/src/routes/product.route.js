const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller.js");

router.post("/create", productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/update/:id", productController.updateProductbyId);
router.get("/search/:barcode", productController.getProductByBarcode);

module.exports = router;
