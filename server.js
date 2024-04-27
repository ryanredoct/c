const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Using mysql2/promise for async/await

const app = express();
const port = process.env.PORT || 8080;

// Replace with your actual MySQL connection details
const pool = mysql.createPool({
  host: 'database-1.cfe82au48n6b.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Man123red',
  database: 'database-1',
});

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS if necessary for your frontend

// Basic route to test server functionality
app.get('/', (req, res) => {
  res.send('Welcome to Node.js API Project');
});

// Route to handle form submission (assuming a POST request)
app.post('/add-data', async (req, res) => {
  const { name, date, age } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `INSERT INTO your_table_name (name, date, age) VALUES (?, ?, ?)`;
    const [results] = await connection.execute(query, [name, date, age]);

    await connection.release(); // Release the connection back to the pool

    res.status(201).json({ message: 'Data added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding data' });
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});


