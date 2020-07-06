const express = require('express')
const server = express()

server.use(express.json())

const PORT = 5001
server.listen(PORT, () => {
    console.log(`Listening on PORT {$PORT}`)
})
