const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Correct path to the router file
app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});