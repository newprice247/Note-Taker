const express = require('express');
const path = require('path')
const db = require('./db/db.json')
const api = require('./routes/api')
const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.static('public'));
// app.use(express.json())


app.use('/api', api)
// app.get('/api', (req, res) => {
//     res.send(`You've successfully called a ${req.method} to the API Route!`)
//     // res.sendFile(path.join(__dirname, 'index.html'));
//     // res.json(db)
//     console.info(req.rawHeaders)
//     console.info(`${req.method} response recieved for an api call!`)
// })


// app.post('/api', (req, res) => {
//     res.send(`You've successfully called a ${req.method} to the API Route!`)
//     // res.json(`${req.method} request recieved!`)
//     console.info(req.rawHeaders)
//     console.info(`${req.method} response recieved for an api call!`)
// })


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    // res.json(db)
    console.info(`${req.method} response recieved!`)
})


app.post('/', (req, res) => {
    res.json(`${req.method} request recieved!`)
    console.info(`${req.method} response recieved!`)
})





app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`)
})