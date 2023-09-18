//Imports node module for managing file systems
const fs = require('fs');
//Imports node module for altering utility behaviors
const util = require('util');
//Alters the behavior of the 'readFile' and 'writeFile' methods of the 'fs' module
const readFromFilePromise = util.promisify(fs.readFile);
const writeToFilePromise = util.promisify(fs.writeFile)
//Function that takes the file path and some kind of content as arguments, then writes the content to the file specified
const writeToFile = (file, content) =>
    fs.writeFile(file, JSON.stringify(content), (err) =>
    err ? console.log(err) : console.log(`\nData written to ${file}${content}`)
);

//Handles 'DELETE' requests
//Function that reads and pulls data from a specified file, parses the 'data' found in that file, filters out the specified 'content', then rewrites the leftover 'data' back into the original file.
const readAndDelete = (content, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        console.log(content)
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data)
            const result = parsedData.filter((dbNote) => dbNote.id !== content)
            console.log(result)
            writeToFile(file, result)
        }
    });
}

//Handles 'POST' requests
//Function that reads and pulls data from a specified file, parses the data found in the file, then adds the specified content into the array of data and rewrites the data back into it's original file.
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        console.log(content)
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data)
            parsedData.push(content)
            console.log(parsedData)
            writeToFile(file, parsedData)
        }
    });
};

//Exports the functions that handle 'DELETE' and 'POST' requests
module.exports = { readAndAppend, readAndDelete };