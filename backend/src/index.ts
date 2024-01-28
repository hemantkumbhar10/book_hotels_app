import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import myHotelRoute from './routes/my-hotels';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})




//CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI as string);


//CREATE NEW EXPRESS APP
const app = express();

//COOKIES ARE NOT TYPICALLY COMES AS A STRING
//TO USE THEM WE MUST CONVERT THEM INTO OBJECT
//cookie-parser CONVERTS THIS Cookie into request.cookies OBJECT
//FROM WHERE WE CAN FIND COOKIES AS request.cookies['auth_token']

app.use(cookieParser());

//CONVERT THE BODY OF API REQUEST TO JSON (APPLIED GLOBALLY)
app.use(express.json());

//PARSE URL
app.use(express.urlencoded({ extended: true }));


//VERIFY CROSS ORIGIN
app.use(cors(
    //ACCEPT API REQUESTS FROM ONLY SPECIFIED ORIGIN URL WITH CREDENTIALS(COOKIES) ALLOWED(true)
    {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }
));

//SERVES STATIC FILES GENREATED IN FRONTEND THROUGH BACKEND
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

//TEST ROUTE CONTROLLER
// app.get('/api/test', async (req: Request, res: Response) => {
//     res.status(200).json({ message: "Greetings from Express Backend Server!" });
// })

//LOGIN LOGOUT ROUTES
app.use('/api/auth', authRoutes);

//REGISTER USER ROUTES
app.use('/api/users', userRoutes);

//CRUD HOTELS ROUTES
app.use('/api/myhotels', myHotelRoute);


//HIDEN ROUTES ARE ALSO HIDDEN FROM STATIC FILES SO WE TELLING THAT ANY OTHER ROUTE(IT MAY BE HIDDEN OR WRONG ONE)
//MUST BE DIRECTED TO frontend/dist/index.html WHERE ALL SECURE ROUTES ARE HANDLED BY REACT_ROUTER_DOM
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
})

//START SERVER
app.listen(8080, () => {
    console.log('Server is successfully running on port: 8080');
})


