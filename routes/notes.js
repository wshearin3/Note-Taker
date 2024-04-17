const notes = require('express').Router();
const { json } = require('express');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');



notes.get('/', (req, res) => {

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

});

notes.post('/', (req, res) => {
    const newNote = req.body;
    newNote.id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'succes',
        body: newNote,
    };
    res.json(response);
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id
    readFromFile('./db/db.json', 'utf8').then((data) => {
        const parseData = JSON.parse(data)
        const newData = parseData.filter((note) => note.id !== noteId)
        return newData
    }).then((newerData) => writeToFile('./db/db.json', newerData)).then((newerData) => {
        res.json(newerData)
    })
});


module.exports = notes;
