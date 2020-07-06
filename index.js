const express = require('express')
const makeId = require('shortid')
const shortid = require('shortid')
const server = express()

server.use(express.json())

let users = [
    {
        id: 1,
        name: "Jane Doe",
        bio: "Unknown woman"
    }
]

server.get('/api/users', (req, res) => {
    users ? 
    res.status(200).json(users) :
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
})

server.get('/api/users/:id', (req, res) =>{
    const {id} = req.params

    const foundUser = users.find(user => user.id)

    foundUser ?
    res.status(201).json(foundUser) :
    res.status(404).json({ message: "The user with the specified ID does not exist." })
})

server.post('/api/users', (req, res) => {
    userInfo = req.body

    userInfo.id = shortid.generate()

    userInfoKeys = Object.keys(userInfo)

    if(userInfoKeys.includes(req.body.name && req.body.bio)) {
        users.push(userInfo)
        res.status(201).json(userInfo)
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    
})

const PORT = 5001
server.listen(PORT, () => {
    console.log(`Listening on PORT {$PORT}`)
})
