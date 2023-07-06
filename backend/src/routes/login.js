const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log("login request");
    res.send(JSON.stringify({data: "OK"}));
})

module.exports = router;