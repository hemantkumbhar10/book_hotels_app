"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const path_1 = __importDefault(require("path"));
//CONNECT TO DATABASE
mongoose_1.default.connect(process.env.MONGO_URI);
//CREATE NEW EXPRESS APP
const app = (0, express_1.default)();
//COOKIES ARE NOT TYPICALLY COMES AS A STRING
//TO USE THEM WE MUST CONVERT THEM INTO OBJECT
//cookie-parser CONVERTS THIS Cookie into request.cookies OBJECT
//FROM WHERE WE CAN FIND COOKIES AS request.cookies['auth_token']
app.use((0, cookie_parser_1.default)());
//CONVERT THE BODY OF API REQUEST TO JSON (APPLIED GLOBALLY)
app.use(express_1.default.json());
//PARSE URL
app.use(express_1.default.urlencoded({ extended: true }));
//VERIFY CROSS ORIGIN
app.use((0, cors_1.default)(
//ACCEPT API REQUESTS FROM ONLY SPECIFIED ORIGIN URL WITH CREDENTIALS(COOKIES) ALLOWED(true)
{
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
//SERVES STATIC FILES GENREATED IN FRONTEND THROUGH BACKEND
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
//TEST ROUTE CONTROLLER
// app.get('/api/test', async (req: Request, res: Response) => {
//     res.status(200).json({ message: "Greetings from Express Backend Server!" });
// })
//LOGIN LOGOUT ROUTES
app.use('/api/auth', auth_routes_1.default);
//REGISTER USER ROUTES
app.use('/api/users', users_routes_1.default);
//START SERVER
app.listen(8080, () => {
    console.log('Server is successfully running on port: 8080');
});
