"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    try {
        const user = await User_1.User.create({ username, password: hashedPassword });
        res.status(201).json({ user });
    }
    catch (error) {
        res.status(400).json({ error: 'User already exists' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User_1.User.findOne({ where: { username } });
        if (user && await bcryptjs_1.default.compare(password, user.password)) {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }
        else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.login = login;
