const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const router = require("./src/routes");
const { connectDB } = require("./src/config");
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.DOMAIN_ALLOWED,
    credentials: true,
  })
);
app.use("/api", router);

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
