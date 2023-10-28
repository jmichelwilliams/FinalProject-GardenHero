"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInUser = void 0;
const mongodb_1 = require("mongodb");
const { createPlantbox } = require('./plantbox_handlers');
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: '../.env' });
const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const userCollection = process.env.USER_COLLECTION;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// Handles user login by verifying the access token (using middleware),
// checking user existence,
// and creating a new user if necessary
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nickname, picture, sub } = req.body.user;
    try {
        const existingUser = yield checkIfUserExists(sub);
        if (existingUser) {
            res.status(200).json({ status: 200, data: existingUser });
            return;
        }
        const newUser = yield createUser(sub, email, nickname, picture);
        // Creating the user's plantbox after creating the user
        yield createPlantbox(sub, email);
        res.status(200).json({ status: 200, data: newUser });
    }
    catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            status: 500,
            error: error.message || 'Internal Server Error',
        });
    }
});
exports.logInUser = logInUser;
// Function to check if user exists
const checkIfUserExists = (sub) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    try {
        if (!MONGO_URI || !dbName || !userCollection) {
            throw new Error('Environment variables not properly set');
        }
        client = new mongodb_1.MongoClient(MONGO_URI, options);
        const db = client.db(dbName);
        yield client.connect();
        const collection = db.collection(userCollection);
        const existingUser = yield collection.findOne({ _id: new mongodb_1.ObjectId(sub) });
        return existingUser;
    }
    catch (error) {
        throw error;
    }
    finally {
        if (client) {
            client.close();
        }
    }
});
// Function to create user
const createUser = (sub, email, nickname, picture) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    try {
        if (!MONGO_URI || !dbName || !userCollection) {
            throw new Error('Envionment variables not properly set');
        }
        client = new mongodb_1.MongoClient(MONGO_URI, options);
        const db = client.db(dbName);
        yield client.connect();
        const collection = db.collection(userCollection);
        const newUser = {
            _id: new mongodb_1.ObjectId(sub),
            email,
            nickname,
            picture,
        };
        yield collection.insertOne(newUser);
        return newUser;
    }
    catch (error) {
        throw error;
    }
    finally {
        if (client) {
            client.close();
        }
    }
});
