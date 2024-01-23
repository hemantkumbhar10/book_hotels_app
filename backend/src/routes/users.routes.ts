import express,{Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import {check} from 'express-validator';

const router = express.Router();


router.post("/register", 
            [check("firstname", "Firstname is required!").isString(),
             check("lastname", "lastname is required!").isString(),
             //VALIDATION VIDEO 1.14.52 s
            ],
            async(req:Request, res:Response)=>{
    try{
        let user = await User.findOne({
            email:req.body.email,
        });

        if(user){
            return res.status(400).json({message:"User already exists!"});
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign({userID:user.id}, process.env.JWT_SECRET as string,{
            expiresIn:"1D"
        });

        res.cookie("auth_token", token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })
        return res.sendStatus(200);

    }catch(e){
        console.log(e);
        res.status(500).json({message:"Something went wrong!"});
    }
})


export default router;