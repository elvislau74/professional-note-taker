const router = require('express').Router();

const notesRoutes = require('./notes');

router.use('/api/notes', notesRoutes);

router.get('/danheng', (req, res) => {
    res.send('Works!');
});

module.exports = router;