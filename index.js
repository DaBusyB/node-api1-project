const express = require('express')
const makeId = require('shortid')
const shortid = require('shortid')
const server = express()

server.use(express.json())

let users = []
/*
{
    "name": "Jane Doe",
    "bio": "Unknown woman"
}

{
    "name": "John Doe",
    "bio": "Unknown man"
}

{
    "name": "Girl Doe",
    "bio": "Unknown girl"
}

{
    "name": "Boy Doe",
    "bio": "Unknown boy"
}
*/
server.get('/api/users', (req, res) => {
    users ?
    res.status(200).json(users) :
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    const user = users.find(user => user.id === id)

    if(user) {
        res.status(200).json(user)
    } else if(!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body

    userInfo.id = makeId.generate()

    const userInfoKeys = Object.keys(userInfo)

    if(!userInfoKeys.includes("name" && "bio")) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if(userInfoKeys.includes("name" && "bio")) {
        users.push(userInfo)
        res.status(201).json(userInfo)
    } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body
    const changesKeys = Object.keys(changes)

    const foundUser = users.findIndex(user => user.id === id)

    if(!changesKeys.includes("name" && "bio")) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if(foundUser !== -1) {
        users[foundUser] = changes
        changes.id = id
        res.status(200).json(users[foundUser])
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params

    const foundUser = users.find(user => user.id === id)

    if(foundUser) {
        users = users.filter(user => user.id !== id)
        res.status(200).json(foundUser)
    } else if(!foundUser) {
        res.status(404).json({ errorMessage: "The user information could not be retrieved." })
    } else {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

const PORT = 5001
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
