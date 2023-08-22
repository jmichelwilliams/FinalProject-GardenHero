const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '../.env' });

const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const cropCollection = process.env.CROP_COLLECTION;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to get all crops
const getAllCrops = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);

  try {
    await client.connect();

    const collection = db.collection(cropCollection);
    const result = await collection.find().sort({ name: 1 }).toArray();

    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    res.status(500).json({ status: 500, error: 'Server Error' });
  } finally {
    client.close();
  }
};

// Function for finding a specific crop
const getCrop = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  const { cropname } = req.params;
  const capitalizeFirstLetter =
    cropname.charAt(0).toUpperCase() + cropname.slice(1);

  try {
    await client.connect();

    const collection = db.collection(cropCollection);
    const result = await collection.findOne({ name: capitalizeFirstLetter });

    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(400).json({ status: 400, error: 'Crop not found!' });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error });
  } finally {
    client.close();
  }
};
module.exports = {
  getAllCrops,
  getCrop,
};
