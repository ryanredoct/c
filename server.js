const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const port = process.env.PORT || 8080;
const app = express();

// Database connection
const db = mysql.createConnection({
  host: 'database-1.cfe82au48n6b.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Man123red',
  database: 'database-1'
});


app.get('/', (req, res) => {
  res.send('Welcome to Nodejs API Project');
});

app.get('/hello', (req, res) => {
  res.send('Hello World!!');
});

// Endpoint to add name and age
app.post('/addPerson', (req, res) => {
  const sql = 'INSERT INTO people SET ?';
  const newPerson = { name: req.body.name, age: req.body.age };
  db.query(sql, newPerson, (err, result) => {
    if (err) {
      console.error('Failed to add person:', err);
      res.status(500).send('Error adding person');
      return;
    }
    res.send('Person added');
  });
});

app.listen(port, () => console.log(`Server is up and running on port ${port}`));

