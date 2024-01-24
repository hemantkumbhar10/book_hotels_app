import { NextFunction, Request, Response } from "express"

const verifyToken = (req:Request, res:Response, next: NextFunction) =>{

    const token = req.cookies['auth_token'];

    if(!token){
        return res.status(401).json({message:"Unauthorized!"});
    }

    try{

        //VERIFYING TOKEN 
        //2.53.21 VIDEO

    }catch(e){
        return res.status(401).json({message:"Unauthorized!"});
    }

}

export default verifyToken;