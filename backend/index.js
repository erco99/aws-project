const {join} = require('path')
require('dotenv').config({path: join(__dirname, "docker", "config.env")})

const express = require('express');
const mongoose = require('mongoose');
const db_config = require('./src/configs/db_config');
const login = require('./src/routes/login');
const cors = require('cors');
const corsOptions = require('./src/configs/cors');
const server = express();
const port = 10000;

mongoose.connect(db_config.connection.uri)
    .then(() => console.log("Mongodb connected successfully"))
    .catch(console.error);

// Register login route
server.use("/login", cors(corsOptions), login);

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})