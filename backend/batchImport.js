const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '../.env' });
const { crops } = require('./data');

const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const collectionName = process.env.CROP_COLLECTION;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log('connected');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(crops);
    console.log(`${result.insertedCount} documents added`);
    console.log('success');
  } catch (error) {
    console.log(error.stack);
    console.log('failure');
  } finally {
    client.close();
    console.log('disconnected');
  }
};

batchImport();
