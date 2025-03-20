const express = require('express');
const db = require('./data/db'); // Corrected require statement
const routes = require('./routes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(routes);

db.intDb((err, database) => {
  if (err) {
    console.error('Database initialization failed:', err);
    return;
  }
  console.log('Database initialized successfully');

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});