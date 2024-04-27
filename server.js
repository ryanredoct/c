const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080; // App Runner sets this environment variable

// Database connection setup
const db = mysql.createConnection({
  host: 'database-1.cfe82au48n6b.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Man123red',
  database: 'mydatabase'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit if the database connection fails
  }
});

// Middleware to parse JSON
app.use(bodyParser.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js App Runner Service');
});

// Route to add user
app.post('/addUser', (req, res) => {
  const { name, age } = req.body;
  const query = 'INSERT INTO Users (name, age) VALUES (?, ?)';
  db.query(query, [name, age], (err) => {
    if (err) {
      console.error('Failed to add user:', err);
      res.status(500).send('Failed to add user');
      return;
    }
    res.send('User added successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

