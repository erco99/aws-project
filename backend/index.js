const express = require('express')
const server = express()
const port = 8080

server.get('/', (req, res) => {
    res.send('Test')
})

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})