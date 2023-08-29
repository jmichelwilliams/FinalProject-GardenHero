const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '../.env' });

const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const plantBoxCollection = process.env.PLANTBOX_COLLECTION;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to get the logged in user's plantbox
const getUserPlantbox = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  const { userid } = req.params;

  try {
    await client.connect();
    const collection = db.collection(plantBoxCollection);

    const result = await collection.findOne({
      _id: userid,
    });

    if (!result) {
      res.status(400).json({ status: 400, message: 'Plantbox not found!' });
      return;
    }

    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.error('MongoDB Error:', error);
    res.status(500).json({ status: 500, error });
  } finally {
    client.close();
  }
};

// Function to create a plantbox
const createPlantbox = async (userid, email) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);

  try {
    await client.connect();
    const collection = db.collection(plantBoxCollection);

    const newPlantbox = {
      _id: userid,
      user: email,
      garden: [],
    };

    await collection.insertOne(newPlantbox);
    return newPlantbox;
  } catch (error) {
    throw new Error(`Failed to create plantbox: ${error.message}`);
  } finally {
    client.close();
  }
};

// Function to add crops to the garden array in plantbox
const addToGarden = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  const { crop } = req.body;
  const { userid } = req.params;

  try {
    await client.connect();
    const collection = db.collection(plantBoxCollection);

    const updateGarden = {
      $push: { garden: crop },
    };

    const result = await collection.updateOne({ _id: userid }, updateGarden);

    if (result.modifiedCount === 1) {
      res.status(200).json({ status: 200, message: 'Crop added successfully' });
    } else {
      res.status(404).json({ status: 404, message: 'Plant box not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

// Function to remove crop from garden
const removeFromGarden = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  const { crop } = req.body;
  const { userid } = req.params;
  try {
    await client.connect();
    const collection = db.collection(plantBoxCollection);

    const updateGarden = {
      $pull: { garden: crop },
    };

    const result = await collection.updateOne({ _id: userid }, updateGarden);

    if (result.modifiedCount === 1) {
      res
        .status(200)
        .json({ status: 200, message: 'Crop removed successfully' });
    } else {
      res.status(404).json({ status: 404, message: 'Plantbox/Crop not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error });
  } finally {
    client.close();
  }
};

module.exports = {
  getUserPlantbox,
  createPlantbox,
  addToGarden,
  removeFromGarden,
};
