const express = require('express');
// const fs = require('fs')
const path = require('path')
const db = require('./db/db.json')
const { writeToFile, readFromFile, readAndAppend } = require('./helpers/fsUtils');
// const notes = require('./routes/notes')
const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))
app.use(express.json())


app.get('/api/notes/:title', (req, res) => {
    const filterResult = db.filter(x => x.title.toLowerCase() === req.params.title)
    filterResult.length === 0 ? res.statusCode = 404 : res.statusCode = 200
    res.json(filterResult)
})

app.get('/api/notes', (req, res) => {
    res.json(db)
    console.info(`${req.method} response recieved for the notes route!`)
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
    console.info(`${req.method} response recieved for the notes route!`)
})


app.post('/api/notes', (req, res) => {
    console.info(`${req.method} response recieved for the notes route!`)
    if (req.body) {
        const newNote = req.body
        readAndAppend(newNote, './db/db.json')
        res.json(newNote)
    } else {
        res.errored('Error in adding new note')
    }
})

app.delete('/api/notes/:title', (req, res) => {
    const noteTitle = req.params.title;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        console.info(json)
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.title !== noteTitle);
        console.info(result)
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
        // Respond to the DELETE request
        // res.json(`Item ${noteTitle} has been deleted 🗑️`);
        res.json(result)
      });
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.info(`${req.method} response recieved!`)
})

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`)
})