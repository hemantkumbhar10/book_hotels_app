import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';


declare global {                     //DECLARES GLOBALLY 
    namespace Express {             //In EXPRESS NAMESPACE
        interface Request {        //WHERE INTERFACE REQUEST WILL HAVE CUSTOM PROPERTIES WE DEFINE
            //BASICALLY WE ARE CUSTOMIZING THIRD_PARTY REQUEST INTERFACE WITH OUR OWN PROPERTIES GLOBALLY
            userId: string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies['auth_token'];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized!" });
    }

    try {
        //VERIFYING TOKEN RECIEVED FROM FRONTEND IF ITS VALID
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        //IF VALID SET USER_ID IN REQUEST FROM PAYLOAD
        req.userId = (token_decoded as JwtPayload).userId;
        //CALLS NEXT FUNCTIONS AS MIDDLEWARE SUPPOSED TO
        next();

    } catch (e) {
        //OTHERWISE SEND ERROR MESSAGE
        return res.status(401).json({ message: "Unauthorized!" });
    }

}

export default verifyToken;