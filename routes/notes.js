// Import router, helper functions and dependencies
const notesRouter = require('express').Router();
const {readFromFile, writeToFile, readAndAppend} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const noteDB = require('../db/db.json');

// GET route for retrieving the notes from the db.json and printing to page
notesRouter.get('/', (req, res) => {
    console.info(`${req.method} request recieved for notes.`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for adding new notes to the db.json and to page
notesRouter.post('/', (req, res) => {
    console.info(`${req.method} request recieved to add a note.`);

    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
        title,
        text,
        id: uuid()
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully!')
    } else {
        res.error('Error in adding note.');
    }
});

// DELETE route for removing notes from db.json and page by id.
// Route for Delete referenced from tabnine.com
notesRouter.delete('/:id', (req, res) => {
    const noteToDelete = req.params.id;
    const newNotes = [];
    if (noteToDelete){
        for(let notes of noteDB) {
            if(notes.id !== noteToDelete){
                newNotes.push(notes);
            };
        }
        writeToFile('./db/db.json', newNotes);

        const response = {
            status: 'success',
            body: newNotes,
          };
      
          res.json(response);
    } else {
        res.json('Error in deleting note.');
    }
});

// Export notesRouter
module.exports = notesRouter;