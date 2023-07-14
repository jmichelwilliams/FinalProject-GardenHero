const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '../.env' });

const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const collectionName = process.env.CROP_COLLECTION;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCrops = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);

  try {
    await client.connect();
    console.log('Connected!');

    const collection = db.collection(collectionName);
    const result = await collection.find().toArray();

    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    res.status(500).json({ status: 500, error: 'Server Error' });
  } finally {
    client.close();
    console.log('Disconnected');
  }
};

module.exports = {
  getCrops,
};
