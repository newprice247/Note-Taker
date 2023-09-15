const { json } = require('express');
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (file, content) =>
    fs.writeFile(file, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${file}`)
    );

// const readAndDelete = (content, file, noteTitle) => {
//     fs.readFile(file, 'utf-8', (err, data) => {
        
//         if (err) {
//             console.error(err)
//         } else {
//             console.log(`here is the noteTitle ${noteTitle}`)
//             console.log(`here is the raw data${data}`)
//             const stringifiedContent = JSON.stringify(content)
//             console.log(`here is the raw content ${stringifiedContent}`)
//             const parsedData = JSON.parse(data)
//             console.log(`here is the parsedData.title ${parsedData.title}`)
//             const newDB = parsedData.filter((parsedContent) => parsedContent.title !== noteTitle)
//             console.log(`here is the else parsedData ${parsedData}`)
//             console.log(`here is the else newDB ${newDB}`)
            
//         }
//         // writeToFile(file, newDB)
//         // console.log(`here is the returned ${newDB}`)
        
//     });
// }

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

module.exports = { writeToFile, readFromFile, readAndAppend };