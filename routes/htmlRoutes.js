const router = require('express').Router();

const notesRouter = require('./apiRoutes');

router.use('/apiRoutes', notesRouter);

router.get('/', )

module.exports = router;
