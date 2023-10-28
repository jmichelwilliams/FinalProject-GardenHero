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
exports.getCrop = exports.getAllCrops = exports.options = void 0;
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: '../.env' });
const { MONGO_URI } = process.env;
const dbName = process.env.DB_NAME;
const cropCollection = process.env.CROP_COLLECTION;
exports.options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// Function to get all crops
const getAllCrops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    try {
        if (!MONGO_URI || !dbName || !cropCollection) {
            throw new Error('Environment variables not properly set');
        }
        client = new mongodb_1.MongoClient(MONGO_URI, exports.options);
        const db = client.db(dbName);
        yield client.connect();
        const collection = db.collection(cropCollection);
        const result = yield collection.find().sort({ name: 1 }).toArray();
        res.status(200).json({ status: 200, data: result });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ status: 500, error: 'Server Error' });
    }
    finally {
        if (client) {
            client.close();
        }
    }
});
exports.getAllCrops = getAllCrops;
// Function for finding a specific crop by crop name
const getCrop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    try {
        if (!MONGO_URI || !dbName || !cropCollection) {
            throw new Error('Environment variables not properly set');
        }
        client = new mongodb_1.MongoClient(MONGO_URI, exports.options);
        const db = client.db(dbName);
        const { cropname } = req.params;
        const capitalizedFirstLetterOfCropName = cropname.charAt(0).toUpperCase() + cropname.slice(1);
        yield client.connect();
        const collection = db.collection(cropCollection);
        const result = yield collection.findOne({
            name: capitalizedFirstLetterOfCropName,
        });
        if (result) {
            res.status(200).json({ status: 200, data: result });
        }
        else {
            res.status(400).json({ status: 400, error: 'Crop not found!' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error });
    }
    finally {
        if (client) {
            client.close();
        }
    }
});
exports.getCrop = getCrop;
