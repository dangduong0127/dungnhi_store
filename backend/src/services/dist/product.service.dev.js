"use strict";

var Product = require("../models/product");

exports.handleCreateProduct = function _callee(data) {
  var findPrd, product;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Product.findOne({
            barcode: data.barcode
          }));

        case 2:
          findPrd = _context.sent;

          if (!findPrd) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", {
            status: 400,
            message: "Sản phẩm này đã được tạo"
          });

        case 7:
          product = new Product({
            barcode: data.barcode,
            name: data.name,
            price: data.price,
            description: data.description,
            image: data.image,
            category: data.category,
            quantity: data.quantity,
            unit: data.unit,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          return _context.abrupt("return", product.save());

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.handleGetProductById = function (id) {
  if (id) {
    return Product.findById(id);
  } else {
    return {
      status: 400,
      message: "Product ID is required"
    };
  }
};

exports.handleUpdateProductbyId = function _callee2(id, data) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!id) {
            _context2.next = 6;
            break;
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate(id, {
            name: data.name,
            price: data.price,
            description: data.description,
            image: data.image,
            category: data.category,
            quantity: data.quantity,
            updatedAt: new Date()
          }));

        case 3:
          return _context2.abrupt("return", {
            status: 200,
            message: "Product updated successfully"
          });

        case 6:
          return _context2.abrupt("return", {
            status: 400,
            message: "Product ID is required"
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.handleGetProductByBarcode = function _callee3(barcode) {
  var product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;

          if (!barcode) {
            _context3.next = 12;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(Product.findOne({
            barcode: barcode
          }));

        case 4:
          product = _context3.sent;

          if (!product) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", product);

        case 9:
          return _context3.abrupt("return", {
            message: "Không tìm thấy sản phẩm"
          });

        case 10:
          _context3.next = 13;
          break;

        case 12:
          return _context3.abrupt("return", {
            status: 400,
            message: "Product barcode is required"
          });

        case 13:
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.handleGetAllProduct = function _callee4() {
  var products;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.find());

        case 3:
          products = _context4.sent;
          console.log(products);
          return _context4.abrupt("return", {
            success: true,
            data: products
          });

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", {
            success: false,
            message: "Could not fetch products"
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.handleDeleteProductById = function _callee5(id) {
  var product;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.findByIdAndDelete(id));

        case 3:
          product = _context5.sent;

          if (product) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", {
            status: 400,
            message: "Product not found"
          });

        case 6:
          return _context5.abrupt("return", {
            status: 200,
            message: "Product deleted successfully"
          });

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};