const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send({res: "ok"});
})

module.exports = router;