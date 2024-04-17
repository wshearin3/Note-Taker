//TODO Make project
const express = require('express');
const path = require('path');
const api = require('./routes/htmlRoutes')
const app = express();

const PORT = process.envPORT || 3008;

app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.listen(PORT, () =>
console.log(`app listenting at http://localhost:${PORT}`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));