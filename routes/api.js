const api = require('express').Router()
const path = require('path')
api.get('/', (req, res) => {
    res.send(`You've successfully called a ${req.method} to the API Route!`)
    // res.sendFile(path.join(__dirname, 'index.html'));
    // res.json(db)
    console.info(`${req.method} response recieved for an api call!`)
})


api.post('/', (req, res) => {
    res.send(`You've successfully called a ${req.method} to the API Route!`)
    // res.json(`${req.method} request recieved!`)
    console.info(`${req.method} response recieved for an api call!`)
})

api.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

api.post('/notes', (req, res) => {

})
module.exports = api