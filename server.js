const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mysql = require('mysql2/promise');
const port = process.env.PORT || 8080;
const app = express();

// MySQL database connection configuration
const connection = mysql.createPool({
  host: 'database-1.cfwug6u48h26.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Mdb123Man',
  database: 'database-1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json(), cors());

// Serve the HTML form
app.get('/', (req, res) => {
  res.send(`
    <form action="/insertData" method="post">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route to insert data into the database
app.post('/insertData', async (req, res) => {
  const { name, email } = req.body;
  try {
    const query = 'INSERT INTO your_table_name (name, email) VALUES (?, ?)';
    await connection.execute(query, [name, email]);
    res.status(200).send('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data');
  }
});

app.get('/hello', (req, res) => {
  res.send('Hello World!!');
});

app.listen(port, () => console.log(`Server is up and running on port ${port}`));

