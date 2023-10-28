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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccessToken = exports.getAuth0PublicKey = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: '../.env' });
const jsonWebToken = require('jsonwebtoken');
const jsonWebKeySetUrl = process.env.JWKS_URL;
// Function to get Auth0 Public key, used to validate access token
const getAuth0PublicKey = (keyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!keyId) {
            throw new Error('keyId is undefined');
        }
        if (!jsonWebKeySetUrl) {
            throw new Error('Environment variables not properly set');
        }
        const response = yield (0, node_fetch_1.default)(jsonWebKeySetUrl);
        const jwks = yield response.json();
        const publicKey = jwks.keys.find((key) => key.kid === keyId);
        if (!publicKey) {
            throw new Error('Public key not found for kid');
        }
        return publicKey;
    }
    catch (error) {
        console.error('Error fetching Auth0 public key:', error);
        throw error;
    }
});
exports.getAuth0PublicKey = getAuth0PublicKey;
// Function to validate access token
const validateAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Taking the token after Bearer in the authorization header
        const accessToken = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!accessToken) {
            throw new Error('Access Token not defined');
        }
        const decodedToken = jsonWebToken.decode(accessToken, { complete: true });
        if (!decodedToken) {
            throw new Error('Access token is invalid');
        }
        const publicKey = yield (0, exports.getAuth0PublicKey)(decodedToken.header.kid);
        const x509Certificate = publicKey.x5c[0];
        const certificatePem = `-----BEGIN CERTIFICATE-----\n${x509Certificate}\n-----END CERTIFICATE-----`;
        const verifiedToken = jsonWebToken.verify(accessToken, certificatePem, {
            algorithms: ['RS256'],
        });
        if (verifiedToken && verifiedToken.sub) {
            // if token is verified , the next() calls the next endpoint handler
            next();
        }
        else {
            res.status(401).json({ status: 401, error: 'Invalid token format' });
        }
    }
    catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            status: 500,
            error: error.message || 'Internal Server Error',
        });
    }
});
exports.validateAccessToken = validateAccessToken;
