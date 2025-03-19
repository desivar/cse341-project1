const router = require('express').Router();
const db = require('../data/db'); // Adjust path if necessary
const { ObjectId } = require('mongodb'); // Import ObjectId

router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const database = db.getDb();
    const contacts = await database.collection('contacts').find({}).toArray();
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get one contact by ID
router.get('/contacts/:id', async (req, res) => {
  try {
    const database = db.getDb();
    const contact = await database.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;