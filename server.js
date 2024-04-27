const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

// Setting up the database connection
const db = mysql.createConnection({
  host: 'database-1.cfe82au48n6b.us-west-1.rds.amazonaws.comt', 
  user: 'admin', 
  password: 'Man123red',
  database: 'database-1'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database.');
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve HTML form at root
app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Person</title>
  </head>
  <body>
    <h1>Add Person</h1>
    <form action="/submit" method="post">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required><br><br>
      <label for="age">Age:</label>
      <input type="text" id="age" name="age" required><br><br>
      <input type="submit" value="Submit">
    </form>
  </body>
  </html>
  `;
  res.send(html);
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { name, age } = req.body;
  const sql = 'INSERT INTO people SET ?';
  db.query(sql, { name, age }, (err, result) => {
    if (err) {
      console.error('Failed to add person:', err);
      res.status(500).send('Failed to add person');
      return;
    }
    res.send('Person added successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

