const notesRouter = require('express').Router();
const fs = require('fs');
const util = require('util');
const {readFromFile, writeToFile, readAndAppend} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const noteDB = require('../db/db.json');

notesRouter.get('/', (req, res) => {
    console.info(`${req.method} request recieved for notes.`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
  
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

notesRouter.delete('/:id', (req, res) => {
    const noteToDelete = req.params.id;
    const newNotes = [];
    if (noteToDelete){
        for(notes of noteDB) {
        if(notes.id !== noteToDelete){
            newNotes.push(notes);
        }
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

module.exports = notesRouter;