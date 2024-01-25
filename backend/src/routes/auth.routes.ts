import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/auth.middleware';

const router = express.Router();


router.post('/login', [check('email', "Email is required!").isEmail(),
check('password', "Password is required!").isLength({ min: 6 })
], async function (req: Request, res: Response) {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).send({ message: error.array() });
    }

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "Invalid Credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid Credentials!" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string,
            { expiresIn: '1D' });

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000,
        })

        return res.status(200).send({ userId: user._id });


    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Something went wrong!' })
    }
})


router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    //VALIDATE TOKEN
    res.status(200).send({ userId: req.userID });
})

router.post("/sign-out", (req: Request, res: Response) => {
    res.cookie('auth_token', "", {
        expires: new Date(0),
    })

    res.status(200).send();
})


export default router;