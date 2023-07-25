const { join } = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: join(__dirname, "docker", "config.env") });
dotenv.config({ path: join(__dirname, ".env") });

const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const mongodbConfig = require("./src/configs/mongodb");
const auth = require("./src/routes/auth");
const users = require("./src/routes/users");
const cors = require("cors");
const corsOptions = require("./src/configs/cors");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketio = require("socket.io");
const port = 10000;

mongoose
  .connect(mongodbConfig.connection.uri)
  .then(() => console.log("Mongodb connected successfully"))
  .catch(console.error);

app.use(express.json());

app.use(cookieParser());

// Register auth routes
app.use("/auth", cors(corsOptions), auth);

// Register user routes
app.use("/users", cors(corsOptions), users);

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// Socket
const controller = require("./src/controllers/bookingController");
const io = socketio(server, { cors: corsOptions });
io.on("connection", (socket) => {
  console.log("conected");
  socket.on("get-week", (day) => controller.getWeek(socket, day));
  socket.on("new-booking", (newBooking) => io.emit("new-booking", newBooking));
  socket.on("disconnect", () => console.log("disconnected"));
});
