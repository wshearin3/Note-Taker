const router = require('express').Router();

const notesRouter = require('./notes');

router.use('/notes', notesRouter);

router.get('/', )

module.exports = router;
