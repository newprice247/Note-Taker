//Imports node module for managing file systems
const fs = require('fs');
//Imports node module for altering utility behaviors
const util = require('util');
//Alters the behavior of the 'readFile' and 'writeFile' methods of the 'fs' module
const readFromFilePromise = util.promisify(fs.readFile);
const writeToFilePromise = util.promisify(fs.writeFile)
//Function that takes the file path and some kind of content as arguments, then writes the content to the file specified
const  writeToFile= (file, content) =>
    writeToFilePromise(file, JSON.stringify(content), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${file}`)
    );
//Function that reads and pulls data from a specified file, parses the 'data' found in that file, filters out the specified 'content', then rewrites the leftover 'data' back into the original file.
//Handles 'DELETE' requests
const readAndDelete = (content, file) => {
    readFromFilePromise(file, 'utf-8', (err, data) => {
        console.log(content)
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data)
            const result = parsedData.filter((dbNote) => dbNote.id !== content)
            writeToFile(file, result)
        }
    });
}
//Function that reads and pulls data from a specified file, parses the data found in the file, then adds the specified content into the array of data and rewrites the data back into it's original file.
//Handles 'POST' requests
const readAndAppend = (content, file) => {
    readFromFilePromise(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data)
            parsedData.push(content)
            writeToFile(file, parsedData)
        }
    });
};

//Exports the functions that handle 'DELETE' and 'POST' requests
module.exports = { readAndAppend, readAndDelete };