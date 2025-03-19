const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb'); // Destructure MongoClient
let database;

const intDb = async (callback) => {
  if (database) {
    console.log('Database already initialized!');
    return callback(null, database);
  }
  try {
    const client = new MongoClient(process.env.MONGODB_URL);
    await client.connect();
    database = client.db('project1');
    callback(null, database);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (!database) {
    throw Error('Database not initialized!');
  }
  return database;
};

module.exports = {
  intDb,
  getDb,
};