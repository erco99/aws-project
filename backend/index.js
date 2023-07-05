const {join} = require('path')
require('dotenv').config({path: join(__dirname, "docker", "config.env")})

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const server = express();
const port = 10000;

connectDB()
    .then(() => console.log("Mongodb connected successfully"))
    .catch(console.error);

server.get('/', (req, res) => {
    res.send('Test');
})

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})