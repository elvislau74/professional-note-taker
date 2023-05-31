const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const {readFromFile, readAndAppend} = require('./helpers/fsUtils');
const routes = require('./routes');
const uuid = require('./helpers/uuid');

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

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);