"use strict";
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
const axios_1 = __importDefault(require("axios"));
const API_KEY = process.env.WEATHER_API_KEY;
// Function to fetch the weather information from the API
const getWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: {
            q: 'Montreal',
            days: '3',
        },
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
    };
    try {
        const response = yield axios_1.default.request(options);
        res.status(200).json({ status: 200, data: response.data });
    }
    catch (error) {
        res.status(500).json({ status: 500, error });
    }
});
exports.default = getWeather;
