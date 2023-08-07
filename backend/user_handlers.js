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

// Function to handle login. If user exists return user if not create user
const logInUser = async (req, res) => {
  const { email, nickname, picture, sub } = req.body.user;

  try {
    const existingUser = await checkIfUserExist(sub);

    if (existingUser) {
      res.status(200).json({ status: 200, data: existingUser });
      return;
    }

    const newUser = await createUser(sub, email, nickname, picture);
    res.status(200).json({ status: 200, data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: error });
  }
};

// Function to check if user exists
const checkIfUserExist = async (sub) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);

  try {
    await client.connect();
    const collection = db.collection(userCollection);

    const existingUser = await collection.findOne({ _id: sub });
    return existingUser;
  } catch (error) {
    throw error;
  } finally {
    client.close();
  }
};

// Function to create user
const createUser = async (sub, email, nickname, picture) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);

  try {
    await client.connect();
    const collection = db.collection(userCollection);
    const newUser = {
      _id: sub,
      email,
      nickname,
      picture,
    };

    await collection.insertOne(newUser);
    return newUser;
  } catch (error) {
    throw error;
  } finally {
    client.close();
  }
};
module.exports = { getUser, logInUser };
