import express, { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';


//ROUTER FUNCTION TO REGISTER ROUTES FOR CONTROLLERS
const router = express.Router();


router.post("/register",
    [check("firstname", "Firstname is required!").isString(),
    check("lastname", "lastname is required!").isString(),
    check("email", "Email is required!").isEmail(),
    check("password", "Password must contain 1 Uppercase, 1 Symbol & 1 numeric character!").isStrongPassword({ minLength: 6, minUppercase: 1, minSymbols: 1 }),
    ],
    async (req: Request, res: Response) => {

        //VALIDATES IF THERES ERROR AND STORES IN ERRORS CONSTANT VARIABLE
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: errors.array() });
        }

        try {
            let user = await User.findOne({
                email: req.body.email,
            });

            if (user) {
                return res.status(400).send({ message: "User already exists!" });
            }

            user = new User(req.body);
            await user.save();

            const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET as string, {
                expiresIn: "1D"
            });

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000
            })
            return res.status(200).send({message:"User registered successfully!"});

        } catch (e) {
            console.log(e);
            res.status(500).send({ message: "Something went wrong!" });
        }
    })


export default router;