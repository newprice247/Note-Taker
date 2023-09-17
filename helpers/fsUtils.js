
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (file, content) =>
    fs.writeFile(file, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${file}`)
    );

const readAndDelete = (content, file) => {
    console.log(`here is the read and delete content ${content}`)
    fs.readFile(file, 'utf-8', (err, data) => {
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
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data)
            parsedData.push(content)
            writeToFile(file, parsedData)
        }
    });
};

module.exports = { writeToFile, readFromFile, readAndAppend, readAndDelete };