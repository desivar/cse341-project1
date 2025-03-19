const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongo').MongoClient;
let database;
const intDb=(callback) => {
    if (database) {
        console.log('Database already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
}
const getDb = () => {
    if (database) {
        throw Error('Database not initialized!');
    }
    return database;
};
module.exports = {
    intDb,
    getDb
};