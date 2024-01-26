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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post('/login', [(0, express_validator_1.check)('email', "Email is required!").isEmail(),
    (0, express_validator_1.check)('password', "Password is required!").isLength({ min: 6 })
], function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.status(400).send({ message: error.array() });
        }
        const { email, password } = req.body;
        try {
            const user = yield user_1.default.findOne({ email });
            if (!user) {
                return res.status(400).send({ message: "Invalid Credentials!" });
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send({ message: "Invalid Credentials!" });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1D' });
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 86400000,
            });
            return res.status(200).send({ userId: user._id });
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ message: 'Something went wrong!' });
        }
    });
});
router.get("/validate-token", auth_middleware_1.default, (req, res) => {
    //VALIDATE TOKEN
    res.status(200).send({ userId: req.userID });
});
router.post("/sign-out", (req, res) => {
    res.cookie('auth_token', "", {
        expires: new Date(0),
    });
    res.status(200).send();
});
exports.default = router;
