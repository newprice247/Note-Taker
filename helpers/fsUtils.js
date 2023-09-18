
const fs = require('fs');
const util = require('util');

const readFromFilePromise = util.promisify(fs.readFile);
const writeToFilePromise = util.promisify(fs.writeFile)

const  writeToFile= (file, content) =>
    writeToFilePromise(file, JSON.stringify(content), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${file}`)
    );

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

module.exports = { readAndAppend, readAndDelete };