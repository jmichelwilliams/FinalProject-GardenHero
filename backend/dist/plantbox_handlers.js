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
exports.removeFromGarden = exports.addToGarden = exports.createPlantbox = exports.getUserPlantbox = void 0;
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: '../.env' });
const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const plantBoxCollection = process.env.PLANTBOX_COLLECTION;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// Function to get the logged in user's plantbox
const getUserPlantbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    const { userid } = req.params;
    try {
        if (!MONGO_URI || !dbName || !plantBoxCollection) {
            throw new Error('Environment variables not properly set');
        }
        client = new mongodb_1.MongoClient(MONGO_URI, options);
        const db = client.db(dbName);
        yield client.connect();
        const collection = db.collection(plantBoxCollection);
        const result = yield collection.findOne({
            _id: new mongodb_1.ObjectId(userid),
        });
        if (!result) {
            res.status(400).json({ status: 400, message: 'Plantbox not found!' });
            return;
        }
        res.status(200).json({ status: 200, data: result });
    }
    catch (error) {
        console.error('MongoDB Error:', error);
        res.status(500).json({ status: 500, error });
    }
    finally {
        if (client) {
            client.close();
        }
    }
});
exports.getUserPlantbox = getUserPlantbox;
// Function to create a plantbox
const createPlantbox = (userid, email) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    try {
        if (!MONGO_URI || !dbName || !plantBoxCollection) {
            throw new Error('Envionment variables not properly set');
        }
        client = new mongodb_1.MongoClient(MONGO_URI, options);
        const db = client.db(dbName);
        yield client.connect();
        const collection = db.collection(plantBoxCollection);
        const newPlantbox = {
            _id: new mongodb_1.ObjectId(userid),
            user: email,
            garden: [],
        };
        yield collection.insertOne(newPlantbox);
        return newPlantbox;
    }
    catch (error) {
        throw new Error(`Failed to create plantbox: ${error.message}`);
    }
    finally {
        if (client) {
            client.close();
        }
    }
});
exports.createPlantbox = createPlantbox;
// Function to add crops to the garden array in plantbox
const addToGarden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    const { crop } = req.body;
    const { userid } = req.params;
    try {
        if (!MONGO_URI || !dbName || !plantBoxCollection) {
            throw new Error('Envionment variables not properly set');
        }
        client = new mongodb_1.MongoClient(MONGO_URI, options);
        const db = client.db(dbName);
        yield client.connect();
        const collection = db.collection(plantBoxCollection);
        const updateGarden = {
            $push: { garden: crop },
        };
        const result = yield collection.updateOne({ _id: new mongodb_1.ObjectId(userid) }, updateGarden);
        if (result.modifiedCount === 1) {
            res.status(200).json({ status: 200, message: 'Crop added successfully' });
        }
        else {
            res.status(404).json({ status: 404, message: 'Plant box not found' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, error });
    }
    finally {
        if (client) {
            client.close();
        }
    }
});
exports.addToGarden = addToGarden;
// Function to remove crop from garden
const removeFromGarden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    const { crop } = req.body;
    const { userid } = req.params;
    try {
        if (!MONGO_URI || !dbName || !plantBoxCollection) {
            throw new Error('Envionment variables not properly set');
        }
        client = new mongodb_1.MongoClient(MONGO_URI, options);
        const db = client.db(dbName);
        yield client.connect();
        const collection = db.collection(plantBoxCollection);
        const updateGarden = {
            $pull: { garden: crop },
        };
        const result = yield collection.updateOne({ _id: new mongodb_1.ObjectId(userid) }, updateGarden);
        if (result.modifiedCount === 1) {
            res
                .status(200)
                .json({ status: 200, message: 'Crop removed successfully' });
        }
        else {
            res.status(404).json({ status: 404, message: 'Plantbox/Crop not found' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, error });
    }
    finally {
        if (client) {
            client.close();
        }
    }
});
exports.removeFromGarden = removeFromGarden;
