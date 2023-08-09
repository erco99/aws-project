const { join } = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: join(__dirname, "docker", "config.env") });
dotenv.config({ path: join(__dirname, ".env") });

const cookieParser = require("cookie-parser");
const useragent = require("express-useragent");
const mongoose = require("mongoose");
const mongodbConfig = require("./src/configs/mongodb");
const auth = require("./src/routes/auth");
const users = require("./src/routes/users");
const weather = require("./src/routes/weather");
const payment = require("./src/routes/payment");
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

app.use(useragent.express());

// Register auth routes
app.use("/auth", cors(corsOptions), auth);

// Register user routes
app.use("/users", cors(corsOptions), users);

// Register weather routes
app.use("/weather", cors(corsOptions), weather);

// Register weather routes
app.use("/payment", cors(corsOptions), payment);

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// Socket
const bookingController = require("./src/controllers/bookingController");
const notificationsController = require("./src/controllers/notificationsController");
const io = socketio(server, { cors: corsOptions });
io.on("connection", (socket) => {
  socket.on("get-week", (day) => bookingController.getWeek(socket, day));
  socket.on("new-booking", async (newBooking) => {
    for (const instance of newBooking) {
      const response = await bookingController.book(instance);
      if (typeof response === "string") {
        socket.emit("error", response);
      } else {
        io.emit("new-booking", response);
      }
    }
  });
  socket.on("getNotifications", (owner) =>
    notificationsController.getNotifications(socket, owner)
  );
});
