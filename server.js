const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// MySQL database connection configuration
const connectionConfig = {
  host: 'database-1.cfe82au48n6b.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Man123red',
  database: 'database-1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Route to test database connectivity
app.get('/testDatabaseConnection', async (req, res) => {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query('SELECT 1');
    res.status(200).send('Database connection test successful');
  } catch (error) {
    console.error('Error testing database connection:', error);
    res.status(500).send(`Error testing database connection: ${error.message}`);
  }
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
