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

const logInUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  const { email, nickname, picture, sub } = req.body.user;

  try {
    await client.connect();

    const collection = db.collection(userCollection);
    const isExistingUser = await collection.findOne({ _id: sub });

    if (isExistingUser) {
      res.status(200).json({ status: 200, data: isExistingUser });
      return;
    }

    // if the user doesn't exist, add it to DB
    const createUser = await collection.insertOne({
      _id: sub,
      email,
      nickname,
      picture,
    });

    res.status(200).json({ status: 200, data: createUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: error });
  }
};
module.exports = { getUser, logInUser };
