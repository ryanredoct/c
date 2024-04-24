const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Using mysql2/promise for async/await

const port = process.env.PORT || 8080; // Use environment variable for port
const app = express();

// Replace placeholders with your actual credentials (ensure security!)
const connectionPool = mysql.createPool({
  host: 'database-1.cfwug6u48h26.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin', // Replace with your database username
  password: 'Mdb123Man', // Replace with your secure password (avoid hardcoding)
  database: 'database-1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to write data to the database (avoid raw SQL for security)
async function writeDataToDatabase(data) {
  const [results] = await connectionPool.query('INSERT INTO your_table SET ?', [data]);
  console.log(`Inserted new record with ID: ${results.insertId}`);
}

// Route to handle data submission from the webpage (using POST)
app.post('/add-data', bodyParser.json(), async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send('Missing data in request body');
    }

    const { name, email } = req.body; // Destructure data from request body
    await writeDataToDatabase({ name, email }); // Pass data as an object
    res.send('Data added successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while adding data.');
  }
});

// Example route to serve a basic HTML form (replace with your actual logic)
app.get('/add-data-form', (req, res) => {
  const form = `
    <form method="POST" action="/add-data">
      <label for="name">Name:</label>
      <input type="text" name="name" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" name="email" required>
      <br>
      <button type="submit">Submit</button>
    </form>
  `;
  res.send(form);
});

app.get('/', (req, res) => {
  res.send('Welcome to Nodejs API Project');
});

app.get('/hello', (req, res) => {
  res.send('Hello World!!');
});

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
