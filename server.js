//TODO Make project
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.envPORT || 3008;

app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, 'index.html'))
)

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'notes.html'))
)

app.listen(PORT, () =>
console.log(`app listenting at http://localhost:${PORT}`)
)