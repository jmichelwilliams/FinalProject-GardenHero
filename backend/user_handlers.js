const { MongoClient } = require('mongodb');
const { createPlantbox } = require('./plantbox_handlers');
const { getAuth0PublicKey } = require('./auth0_handlers');

require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');

const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const userCollection = process.env.USER_COLLECTION;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Handles user login by verifying the access token, checking user existence,
// and creating a new user if necessary
const logInUser = async (req, res) => {
  const { email, nickname, picture, sub } = req.body.user;

  try {
    const accessToken = req.headers?.authorization?.split(' ')[1];

    if (!accessToken) {
      throw new Error('Access Token not defined');
    }
    const decodedToken = jwt.decode(accessToken, { complete: true });
    if (!decodedToken) {
      throw new Error('Access token is invalid');
    }
    const publicKey = await getAuth0PublicKey(decodedToken.header.kid);
    const x509Certificate = publicKey.x5c[0];

    const certificatePem = `-----BEGIN CERTIFICATE-----\n${x509Certificate}\n-----END CERTIFICATE-----`;

    const verifiedToken = jwt.verify(accessToken, certificatePem, {
      algorithms: ['RS256'],
    });

    if (verifiedToken && verifiedToken.sub) {
      const existingUser = await checkIfUserExist(sub);

      if (existingUser) {
        res.status(200).json({ status: 200, data: existingUser });
        return;
      }

      const newUser = await createUser(sub, email, nickname, picture);
      const newPlantbox = await createPlantbox(sub, email);
      res.status(200).json({ status: 200, data: newUser });
    } else {
      res.status(401).json({ status: 401, error: 'Invalid token format' });
    }
  } catch (error) {
    console.log('error: ', error);
    res
      .status(500)
      .json({ status: 500, error: error.message || 'Internal Server Error' });
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

module.exports = { logInUser };
