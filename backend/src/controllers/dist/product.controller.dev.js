"use strict";

var productService = require("../services/product.service.js");

exports.createProduct = function _callee(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(productService.handleCreateProduct(req.body));

        case 2:
          response = _context.sent;

          if (!(response.status === 400)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json(response));

        case 7:
          return _context.abrupt("return", res.status(200).json(response));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getProductById = function _callee2(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(productService.handleGetProductById(req.params.id));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(response));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateProductbyId = function _callee3(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(productService.handleUpdateProductbyId(req.params.id, req.body));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(response));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getProductByBarcode = function _callee4(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(productService.handleGetProductByBarcode(req.params.barcode));

        case 3:
          response = _context4.sent;

          if (!(response.status === 400)) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(400).json(response));

        case 8:
          return _context4.abrupt("return", res.status(200).json(response));

        case 9:
          _context4.next = 14;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getAllProduct = function _callee5(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(productService.handleGetAllProduct());

        case 3:
          response = _context5.sent;

          if (!(response.success === false)) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: "No product found"
          }));

        case 8:
          return _context5.abrupt("return", res.status(200).json(response));

        case 9:
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.deleteProductById = function _callee6(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(productService.handleDeleteProductById(req.params.id));

        case 3:
          response = _context6.sent;
          return _context6.abrupt("return", res.status(200).json(response));

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};