const {join} = require('path')
require('dotenv').config({path: join(__dirname, "docker", "config.env")})

const express = require('express');
const mongoose = require('mongoose');
const db_config = require('./src/configs/db_config');
const server = express();
const port = 10000;

mongoose.connect(db_config.connection.uri)
    .then(() => console.log("Mongodb connected successfully"))
    .catch(console.error);

server.get('/', (req, res) => {
    res.send('Test');
})

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})