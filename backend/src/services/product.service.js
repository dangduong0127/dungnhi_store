const Product = require("../models/product");

exports.handleCreateProduct = async (data) => {
  const findPrd = await Product.findOne({ barcode: data.barcode });

  if (findPrd) {
    return {
      status: 400,
      message: "Sản phẩm này đã được tạo",
    };
  } else {
    const product = new Product({
      barcode: data.barcode,
      name: data.name,
      price: data.price,
      description: data.description,
      image: data.image,
      category: data.category,
      quantity: data.quantity,
      unit: data.unit,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return product.save();
  }
};

exports.handleGetProductById = (id) => {
  if (id) {
    return Product.findById(id);
  } else {
    return {
      status: 400,
      message: "Product ID is required",
    };
  }
};

exports.handleUpdateProductbyId = async (id, data) => {
  if (id) {
    await Product.findByIdAndUpdate(id, {
      name: data.name,
      price: data.price,
      description: data.description,
      image: data.image,
      category: data.category,
      quantity: data.quantity,
      updatedAt: new Date(),
    });

    return {
      status: 200,
      message: "Product updated successfully",
    };
  } else {
    return {
      status: 400,
      message: "Product ID is required",
    };
  }
};

exports.handleGetProductByBarcode = async (barcode) => {
  try {
    if (barcode) {
      const product = await Product.findOne({ barcode: barcode });
      if (product) {
        return product;
      } else {
        return { message: "Không tìm thấy sản phẩm" };
      }
    } else {
      return {
        status: 400,
        message: "Product barcode is required",
      };
    }
  } catch (e) {
    console.log(e);
  }
};
