// Import express
const express = require('express');
const path = require('path');

// Import routes folder for modular routing
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

// Initialize app variable
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware pointing to the public folder
app.use(express.static('public'));

// Use routes folder
app.use(routes);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Listen route to connect to page on specified port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);