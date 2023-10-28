import { Request, Response } from 'express';
import { MongoClient, MongoClientOptions } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const cropCollection = process.env.CROP_COLLECTION;

interface Options extends MongoClientOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}
const options: Options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to get all crops
export const getAllCrops = async (req: Request, res: Response) => {
  let client: MongoClient | undefined;

  try {
    if (!MONGO_URI || !dbName || !cropCollection) {
      throw new Error('Environment variables not properly set');
    }

    client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);

    await client.connect();

    const collection = db.collection(cropCollection);
    const result = await collection.find().sort({ name: 1 }).toArray();

    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 500, error: 'Server Error' });
  } finally {
    if (client) {
      client.close();
    }
  }
};

// Function for finding a specific crop by crop name
export const getCrop = async (req: Request, res: Response) => {
  let client: MongoClient | undefined;
  try {
    if (!MONGO_URI || !dbName || !cropCollection) {
      throw new Error('Environment variables not properly set');
    }

    client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);
    const { cropname } = req.params;
    const capitalizedFirstLetterOfCropName =
      cropname.charAt(0).toUpperCase() + cropname.slice(1);

    await client.connect();

    const collection = db.collection(cropCollection);
    const result = await collection.findOne({
      name: capitalizedFirstLetterOfCropName,
    });

    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(400).json({ status: 400, error: 'Crop not found!' });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error });
  } finally {
    if (client) {
      client.close();
    }
  }
};
