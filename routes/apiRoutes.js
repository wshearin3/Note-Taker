const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const dbPath = path.join(__dirname, './db/db.json');

router.get('/notes', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes.' });
    }
    res.json(JSON.parse(data));
  });
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id= Math.floor((1 + Math.random())*0x10000).toString(16).substring(1);
  
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


module.exports = router;
