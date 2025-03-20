const express = require('express');
const db = require('./data/db');
const routes = require('./routes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Move the / route here
app.get('/', (req, res) => {
  res.send(`
    <h1>Contacts</h1>
    <ul id="contactsList"></ul>
    <script>
      fetch('/contacts')
        .then(response => response.json())
        .then(data => {
          const contactsList = document.getElementById('contactsList');
          data.forEach(contact => {
            const listItem = document.createElement('li');
            listItem.textContent = \`\${contact.firstName} \${contact.lastName} (\${contact.email})\`;
            contactsList.appendChild(listItem);
          });
        });
    </script>
  `);
});

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