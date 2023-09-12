const notes = require('express').Router()
const path = require('path')

// notes.use(express.static('../public'))

// notes.get('/', (req, res) => {
//     // res.send(`You've successfully called a ${req.method} to the API Route!`)
//     res.sendFile(path.join(__dirname, 'notes.html'));
//     // res.json(db)
//     console.info(`${req.method} response recieved for the notes route!`)
// })


// notes.post('/', (req, res) => {
//     res.send(`You've successfully called a ${req.method} to the API Route!`)
//     // res.json(`${req.method} request recieved!`)
//     console.info(`${req.method} response recieved for the notes route!`)
//     // console.info(req.body)
// })

// notes.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/notes.html'))
// })

// notes.post('/notes', (req, res) => {
//     console.info(`${req.method} request recieved to add a note!`)
// })
module.exports = notes