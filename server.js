const express = require('express');
const path = require('path')
const db = require('./db/db.json')
const uniqid = require('uniqid')
const Note = require('./helpers/class')
const { readAndAppend, readAndDelete } = require('./helpers/fsUtils');


const PORT = process.env.PORT || 3001;
const app = express()


app.use('/notes', express.static(path.join(__dirname, './public/notes.html')))
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
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


app.post('/api/notes', (req, res) => {
    console.info(`${req.method} response recieved for the notes route!`)
    if (req.body) {
        let newNote = new Note()
        newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid()
        }
        readAndAppend(newNote, './db/db.json')
        res.json(db)
    } else {
        res.errored('Error in adding new note')
    }
})


app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    console.info(noteId)
    readAndDelete(noteId, './db/db.json')
    res.json(db)
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.info(`${req.method} response recieved!`)
})

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`)
})