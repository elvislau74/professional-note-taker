// Import router
const router = require('express').Router();

// Import module for notes
const notesRoutes = require('./notes');

// Use route starting with /api/notes
router.use('/api/notes', notesRoutes);

router.get('/danheng', (req, res) => {
    res.send('Works!');
});

// Export router
module.exports = router;