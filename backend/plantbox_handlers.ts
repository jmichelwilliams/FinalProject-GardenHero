import { Request, Response } from 'express';
import { MongoClient, MongoClientOptions, ObjectId } from 'mongodb';

import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const plantBoxCollection = process.env.PLANTBOX_COLLECTION;

interface Options extends MongoClientOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: Options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

interface GardenPlant {
  _id: ObjectId;
  name: string;
  soil: string;
  temperature: number;
  plantingSeason: string;
  daysToHarvest: number;
  url: string;
  plantedOn: string;
  harvestDate: string;
}
interface Plantbox {
  _id: ObjectId;
  user: string;
  garden: GardenPlant[];
}

// Function to get the logged in user's plantbox
export const getUserPlantbox = async (req: Request, res: Response) => {
  let client: MongoClient | undefined;
  const { userid } = req.params;
  try {
    if (!MONGO_URI || !dbName || !plantBoxCollection) {
      throw new Error('Environment variables not properly set');
    }

    client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);

    await client.connect();
    const collection = db.collection(plantBoxCollection);

    const result = await collection.findOne({
      _id: new ObjectId(userid),
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
    if (client) {
      client.close();
    }
  }
};

// Function to create a plantbox
export const createPlantbox = async (userid: string, email: string) => {
  let client: MongoClient | undefined;

  try {
    if (!MONGO_URI || !dbName || !plantBoxCollection) {
      throw new Error('Envionment variables not properly set');
    }

    client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);

    await client.connect();
    const collection = db.collection(plantBoxCollection);

    const newPlantbox: Plantbox = {
      _id: new ObjectId(userid),
      user: email,
      garden: [],
    };

    await collection.insertOne(newPlantbox);
    return newPlantbox;
  } catch (error) {
    throw new Error(`Failed to create plantbox: ${(error as Error).message}`);
  } finally {
    if (client) {
      client.close();
    }
  }
};

// Function to add crops to the garden array in plantbox
export const addToGarden = async (req: Request, res: Response) => {
  let client: MongoClient | undefined;
  const { crop } = req.body;
  const { userid } = req.params;

  try {
    if (!MONGO_URI || !dbName || !plantBoxCollection) {
      throw new Error('Envionment variables not properly set');
    }
    client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);

    await client.connect();
    const collection = db.collection(plantBoxCollection);

    const updateGarden = {
      $push: { garden: crop },
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(userid) },
      updateGarden,
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ status: 200, message: 'Crop added successfully' });
    } else {
      res.status(404).json({ status: 404, message: 'Plant box not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error });
  } finally {
    if (client) {
      client.close();
    }
  }
};

// Function to remove crop from garden
export const removeFromGarden = async (req: Request, res: Response) => {
  let client: MongoClient | undefined;
  const { crop } = req.body;
  const { userid } = req.params;

  try {
    if (!MONGO_URI || !dbName || !plantBoxCollection) {
      throw new Error('Envionment variables not properly set');
    }

    client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);

    await client.connect();
    const collection = db.collection(plantBoxCollection);

    const updateGarden = {
      $pull: { garden: crop },
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(userid) },
      updateGarden,
    );

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
    if (client) {
      client.close();
    }
  }
};
