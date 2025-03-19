const express = require('express');
const mongodb = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// Correct path to the router file
const routes = require('./routes');

// Use the routes
app.use(routes);

// Initialize MongoDB
mongodb.MongoClient.connect('your-mongodb-connection-string', (err, client) => {
  if (err) {
    console.error('Failed to connect to the database. Error:', err);
    process.exit(1);
  }
  console.log('project connected to the database');
  const db = client.db('project1'); // Ensure you select the database

  // Start the server after successful database connection
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
