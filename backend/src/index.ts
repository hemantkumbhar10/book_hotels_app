import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users.routes';


//CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI as string);



//CREATE NEW EXPRESS APP
const app = express();

//CONVERT THE BODY OF API REQUEST TO JSON (APPLIED GLOBALLY)
app.use(express.json());

//PARSE URL
app.use(express.urlencoded({ extended: true }));


//VERIFY CROSS ORIGIN
app.use(cors());


//TEST ROUTE CONTROLLER
// app.get('/api/test', async (req: Request, res: Response) => {
//     res.status(200).json({ message: "Greetings from Express Backend Server!" });
// })

app.use('/api/users', userRoutes);

//START SERVER
app.listen(8080, ()=>{
    console.log('Server is successfully running on port: 8080');
})


