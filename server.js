const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.intDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected");
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});