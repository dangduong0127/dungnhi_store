"use strict";

var mongoose = require("mongoose");

var uri = "mongodb+srv://"
  .concat(process.env.DB_USERNAME, ":")
  .concat(process.env.DB_PASS, "@cluster0.9rk36pv.mongodb.net/dungnhi_store");

var connectDB = function connectDB() {
  return regeneratorRuntime.async(
    function connectDB$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(mongoose.connect(uri));

          case 3:
            console.log("✅ MongoDB connected");
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.error("❌ MongoDB connection error:", _context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    },
    null,
    null,
    [[0, 6]]
  );
};

module.exports = connectDB;
