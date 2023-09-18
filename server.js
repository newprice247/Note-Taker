//Imports express module
const express = require('express');
//Imports node js path module
const path = require('path')
//Imports db.json file which stores the user's notes
const db = require('./db/db.json')
//Imports "uniqid" node module, which will always create unique id's based on the current time, process and machine name.
const uniqid = require('uniqid')
//Imports the Note class for structuring the user's notes
const Note = require('./helpers/class')
//Imports functions that read and either add or delete notes from the db.json file
const { readAndAppend, readAndDelete } = require('./helpers/fsUtils');

//For use in external services such as heroku, it says "Use the port number you want to use, or 3001"
const PORT = process.env.PORT || 3001;
//Sets express function to variable for use in managing requests
const app = express()

//Sets route for '/notes' path, and defaults the 'GET' request for that route
app.use('/notes', express.static(path.join(__dirname, './public/notes.html')))
//Serves static files from the public directory, and allows the server to access them through their relative paths
app.use(express.static('public'));
//Middleware that handles json requests and responses
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Handles 'GET' requests for the '/notes' route for specific notes based on the title of the note, and responds with the JSON object that relates to that request
app.get('/api/notes/:title', (req, res) => {
    const filterResult = db.filter(x => x.title.toLowerCase() === req.params.title)
    filterResult.length === 0 ? res.statusCode = 404 : res.statusCode = 200
    res.json(filterResult)
})

//Handles 'GET' requests to the '/api/notes' route
//Responds with the note data stored in the 'db.json' file
app.get('/api/notes', (req, res) => {
    res.json(db)
    console.info(`${req.method} response recieved for the notes route!`)
})

//Handles 'POST' requests to the '/api/notes' route
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} response recieved for the notes route!`)
    //If the server recieves a json payload, a new 'note' object is created based on the imported Note class, using the key-value pairs stored in the json payload, and creates a unique ID with the 'uniqid' node module.
    if (req.body) {
        let newNote = new Note()
        newNote = { title: req.body.title, text: req.body.text, id: uniqid() }
        //Calls a function to read the 'db.json' file, parses that data, pushes the newNote object into the resulting array, and then writes the data back into the 'db.json' file
        readAndAppend(newNote, './db/db.json')
    } else {
        res.errored('Error in adding new note')
    }
    res.json(db)
})

//Handles 'DELETE' requests based on the stored id of the note the user wants to delete
app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} response recieved for the notes route!`)
    //Sets the id to a variable
    const noteId = req.params.id;
    //Calls a function to read the data stored in the 'db.json' file, filter out the soon to be deleted object with an id matching the 'noteID' variable, then writes the leftover objects back into the 'db.json' file
    readAndDelete(noteId, './db/db.json')
    res.json(db)
});

//Handles the default 'GET' request if no route is specified
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.info(`${req.method} response recieved!`)
})

//Listens to the current port and awaits requests
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`)
})