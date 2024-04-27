const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 8080;

// MySQL connection setup
const db = mysql.createConnection({
  host: 'database-1.cfe82au48n6b.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Man123red',
  database: 'mydatabase'
});

db.connect(err => {
  if (err) {
    return console.error('error connecting: ' + err.stack);
  }
  console.log('connected to database as id ' + db.threadId);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Nodejs API Project');
});

app.post('/users', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).send('Name and age are required');
  }

  const query = 'INSERT INTO Users (name, age) VALUES (?, ?)';
  db.query(query, [name, age], (err, results) => {
    if (err) {
      console.error('Error inserting data into the database', err);
      return res.status(500).send('Failed to add user');
    }
    res.send('Success');
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

