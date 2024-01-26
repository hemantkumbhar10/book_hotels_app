"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
//ROUTER FUNCTION TO REGISTER ROUTES FOR CONTROLLERS
const router = express_1.default.Router();
router.post("/register", [(0, express_validator_1.check)("firstname", "Firstname is required!").isString(),
    (0, express_validator_1.check)("lastname", "lastname is required!").isString(),
    (0, express_validator_1.check)("email", "Email is required!").isEmail(),
    (0, express_validator_1.check)("password", "Password must contain 1 Uppercase, 1 Symbol & 1 numeric character!").isStrongPassword({ minLength: 6, minUppercase: 1, minSymbols: 1 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //VALIDATES IF THERES ERROR AND STORES IN ERRORS CONSTANT VARIABLE
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: errors.array() });
    }
    try {
        let user = yield user_1.default.findOne({
            email: req.body.email,
        });
        if (user) {
            return res.status(400).send({ message: "User already exists!" });
        }
        user = new user_1.default(req.body);
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userID: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1D"
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        });
        return res.status(200).send({ message: "User registered successfully!" });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: "Something went wrong!" });
    }
}));
exports.default = router;
