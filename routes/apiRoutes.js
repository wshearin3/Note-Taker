const fs = require('fs');
const path = require('path');
const notes = require('express').Router();
const { json } = require('express');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

const dbPath = path.join(__dirname, './db/db.json');

notes.get('/', (req, res) => {

    readFromFile(dbPath).then((data) => res.join(JSON.parse(data)));

});

router.post('/', (req, res) => {
    const newNote = req.body;
    newNote.id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    readAndAppend(newNote, dbPath);

    const response = {
        status: 'succes',
        body: newNote,
    };
    res.json(response);
});
    


module.exports = notes;
