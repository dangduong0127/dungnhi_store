"use strict";

var express = require("express");

var router = express.Router();

var productController = require("../controllers/product.controller.js");

router.post("/create", productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/update/:id", productController.updateProductbyId);
router.get("/search/:barcode", productController.getProductByBarcode);
router.get("/findall/getAllProduct", productController.getAllProduct);
router["delete"]("/delete/:id", productController.deleteProductById);
module.exports = router;