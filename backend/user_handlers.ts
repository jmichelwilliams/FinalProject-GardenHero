import { Request, Response } from 'express';
import { MongoClient, MongoClientOptions } from 'mongodb';
const { createPlantbox } = require('./plantbox_handlers');
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const userCollection = process.env.USER_COLLECTION;

interface Options extends MongoClientOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: Options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

interface User {
  _id: string;
  email: string;
  nickname: string;
  picture: string;
}

// Handles user login by verifying the access token (using middleware),
// checking user existence,
// and creating a new user if necessary
export const logInUser = async (req: Request, res: Response) => {
  const { email, nickname, picture, sub } = req.body.user;

  try {
    const existingUser = await checkIfUserExists(sub);

    if (existingUser) {
      res.status(200).json({ status: 200, data: existingUser });
      return;
    }

    const newUser = await createUser(sub, email, nickname, picture);
    // Creating the user's plantbox after creating the user
    await createPlantbox(sub, email);
    res.status(200).json({ status: 200, data: newUser });
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({
      status: 500,
      error: (error as Error).message || 'Internal Server Error',
    });
  }
};

// Function to check if user exists
const checkIfUserExists = async (sub: string) => {
  let client: MongoClient | undefined;

  try {
    if (!MONGO_URI || !dbName || !userCollection) {
      throw new Error('Environment variables not properly set');
    }
    client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);

    await client.connect();
    const collection = db.collection(userCollection);

    const existingUser = await collection.findOne({ _id: sub as any });
    return existingUser;
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};

// Function to create user
const createUser = async (
  sub: string,
  email: string,
  nickname: string,
  picture: string,
): Promise<User> => {
  let client: MongoClient | undefined;

  try {
    if (!MONGO_URI || !dbName || !userCollection) {
      throw new Error('Envionment variables not properly set');
    }
    client = new MongoClient(MONGO_URI, options);
    const db = client.db(dbName);

    await client.connect();
    const collection = db.collection(userCollection);
    const newUser: User = {
      _id: sub,
      email,
      nickname,
      picture,
    };

    await collection.insertOne(newUser as any);
    return newUser;
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
};
