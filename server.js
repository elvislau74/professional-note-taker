const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const {readFromFile, writeToFile, readAndAppend} = require('./helpers/fsUtils');
const routes = require('./routes');
const uuid = require('./helpers/uuid');
const noteDB = require('./db/db.json');



const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.use(routes);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request recieved for notes.`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

app.post('/api/notes', (req, res) => {
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

// app.get('/api/notes/:id', (req, res) => {
//   console.info(`${req.method} request recieved for notes.`);
//   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
// })

app.delete('/api/notes/:id', (req, res) => {
  const noteToDelete = req.params.id;
  const newNotes = [];
  if (noteToDelete){
    for(notes of noteDB) {
      if(notes.id !== noteToDelete){
        newNotes.push(notes);
      }
    }
    writeToFile('./db/db.json', newNotes);
  };
  // let DB = noteDB;
  // const newNotes = [];
  // fs.readFile('./db/db.json', 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     const parsedData = JSON.parse(data);
  //     for(notes of parsedData) {
  //       if(notes.id !== noteToDelete){
  //         newNotes.push(notes);
  //       }
  //     }
  //     // const noteString = JSON.stringify(newNotes);
  //     writeToFile('./db/db.json', newNotes);
  //   }
  // });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);