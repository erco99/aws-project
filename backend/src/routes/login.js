const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log("test");
    res.send(JSON.stringify({data: "test"}));
})

module.exports = router;