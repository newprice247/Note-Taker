const express = require('express');
const fs = require('fs')
const path = require('path')
const db = require('./db/db.json')
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');
// const notes = require('./routes/notes')
const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.static('public'));
app.use(express.json())


// app.use('/notes', notes)
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

// app.get(`/api/notes/:id`, (req, res) => {
//     readFromFile('./db/db.json').then((data) => res.json(data))
// })
app.get('/api/notes/:title', (req, res) => {
    //TODO: Filter based on the parameter input from client
    const filterResult = db.filter(x => x.title.toLowerCase() === req.params.title)
    filterResult.length === 0 ? res.statusCode = 404 : res.statusCode = 200
    res.json(filterResult)
  })

app.get('/api/notes', (req, res) => {
    // res.send(`You've successfully called a ${req.method} to the API Route!`)
    // res.sendFile(path.join(__dirname, './public/notes.html'));
    res.json(db)
    console.info(`${req.method} response recieved for the notes route!`)
})

app.get('/notes', (req, res) => {
    // res.send(`You've successfully called a ${req.method} to the API Route!`)
    res.sendFile(path.join(__dirname, './public/notes.html'));
    // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    console.info(`${req.method} response recieved for the notes route!`)
})


app.post('/api/notes', (req, res) => {
    // res.send(`You've successfully called a ${req.method} to the API Route!`)
    // res.json(`${req.method} request recieved!`)
    
    // console.info(req.body)
    
    console.info(`${req.method} response recieved for the notes route!`)

//   // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

//   // If all the required properties are present
//   if (title && text) {
//     // Variable for the object we will save
//     const newReview = {
//       title,
//       text
//     };

//     const response = {
//       status: 'success',
//       body: newReview,
//     };

//     console.info(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in posting review');
//   }
    if(req.body) {
        const newNote = {
            title,
            text
        }
        readAndAppend(newNote, './db/db.json')
    } else {
        res.errored('Error in adding new note')
    }
})


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