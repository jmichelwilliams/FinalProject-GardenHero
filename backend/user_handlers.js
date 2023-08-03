const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '../.env' });

const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const userCollection = process.env.USER_COLLECTION;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);

  try {
    await client.connect();

    const collection = db.collection(userCollection);
    const result = await collection.find().toArray();

    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    res.status(500).json({ status: 500, error: 'Server Error' });
  } finally {
    client.close();
  }
};

const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ message: 'Access token not provided' });
  }
  try {
  } catch (error) {
    res.status(500).json({ status: 500, error: erro });
  }
};
module.exports = { getUser };
