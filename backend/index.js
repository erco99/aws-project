const { join } = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: join(__dirname, "docker", "config.env") });
dotenv.config({ path: join(__dirname, ".env") });

const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const mongodbConfig = require("./src/configs/mongodb");
const auth = require("./src/routes/auth");
const booking = require("./src/routes/booking");
const cors = require("cors");
const corsOptions = require("./src/configs/cors");
const server = express();
const port = 10000;

mongoose
  .connect(mongodbConfig.connection.uri)
  .then(() => console.log("Mongodb connected successfully"))
  .catch(console.error);

server.use(express.json());

server.use(cookieParser());

// Register auth routes
server.use("/auth", cors(corsOptions), auth);

// Register booking routes
server.use("/booking", cors(corsOptions), booking);

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
