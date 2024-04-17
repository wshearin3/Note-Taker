const fs = require('fs');
const path = require('path');
const notes = require('express').Router();
const { json } = require('express');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

const dbPath = path.join(__dirname, './db/db.json');

notes.get('/', (req, res) => {

    readFromFile(dbPath).then((data) => res.join(JSON.parse(data)));

});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes.' });
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save note.' });
            }
            res.json(newNote);
        });
    });
});


module.exports = notes;
