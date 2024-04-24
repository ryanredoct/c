const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mysql = require('mysql2/promise'); // Use mysql2
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

app.use(bodyParser.json(), cors());

// Route to insert data into the database
app.post('/insertData', async (req, res) => {
  const data = req.body;
  try {
    const query = 'INSERT INTO your_table_name SET ?';
    const [rows, fields] = await connection.execute(query, [data]);
    res.status(200).send('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data');
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to Node.js API Project');
});

app.get('/hello', (req, res) => {
  res.send('Hello World!!');
});

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
