"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const crop_handlers_1 = require("./crop_handlers");
const user_handlers_1 = require("./user_handlers");
const weather_handlers_1 = __importDefault(require("./weather_handlers"));
const plantbox_handlers_1 = require("./plantbox_handlers");
const auth0_handlers_1 = require("./auth0_handlers");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
const allowedOrigins = [
    'http://localhost:3000',
    'https://garden-hero.vercel.app',
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
// crops
app.get('/crops', crop_handlers_1.getAllCrops);
app.get('/crop/:cropname', crop_handlers_1.getCrop);
// login
app.post('/login', auth0_handlers_1.validateAccessToken, user_handlers_1.logInUser);
// weather
app.get('/weather', weather_handlers_1.default);
// plantbox
app.get('/plantbox/:userid', auth0_handlers_1.validateAccessToken, plantbox_handlers_1.getUserPlantbox);
app.patch('/plantbox/:userid', auth0_handlers_1.validateAccessToken, plantbox_handlers_1.addToGarden);
app.delete('/plantbox/:userid', auth0_handlers_1.validateAccessToken, plantbox_handlers_1.removeFromGarden);
// catch-all endpoint
app.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'This is obviously not what you are looking for.',
    });
});
let port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
