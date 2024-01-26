"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies['auth_token'];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    try {
        //VERIFYING TOKEN RECIEVED FROM FRONTEND IF ITS VALID
        const token_decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // console.log(JSON.stringify(token_decoded) + "TOKEN DECODED");
        //IF VALID SET USER_ID IN REQUEST FROM PAYLOAD
        req.userID = token_decoded.userID;
        //CALLS NEXT FUNCTIONS AS MIDDLEWARE SUPPOSED TO
        next();
    }
    catch (e) {
        //OTHERWISE SEND ERROR MESSAGE
        return res.status(401).json({ message: "Unauthorized!" });
    }
};
exports.default = verifyToken;
