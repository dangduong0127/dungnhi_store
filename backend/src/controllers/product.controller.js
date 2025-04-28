const productService = require("../services/product.service.js");

exports.createProduct = async (req, res) => {
  const response = await productService.handleCreateProduct(req.body);
  if (response.status === 400) {
    return res.status(400).json(response);
  } else {
    return res.status(200).json(response);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const response = await productService.handleGetProductById(req.params.id);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

exports.updateProductbyId = async (req, res) => {
  try {
    const response = await productService.handleUpdateProductbyId(
      req.params.id,
      req.body
    );
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

exports.getProductByBarcode = async (req, res) => {
  try {
    const response = await productService.handleGetProductByBarcode(
      req.params.barcode
    );
    if (response.status === 400) {
      return res.status(400).json(response);
    } else {
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const response = await productService.handleGetAllProduct();
    if (response.success === false) {
      return res.status(400).json({ message: "No product found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const response = await productService.handleDeleteProductById(
      req.params.id
    );
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};
