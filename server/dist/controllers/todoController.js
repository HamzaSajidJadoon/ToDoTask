"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = exports.addTodo = void 0;
const Todo_1 = require("../models/Todo");
const addTodo = async (req, res) => {
    const { task } = req.body;
    const userId = req.userId; // Assume middleware adds userId to req
    try {
        const todo = await Todo_1.Todo.create({ user_id: userId, task });
        res.status(201).json({ todo });
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating todo' });
    }
};
exports.addTodo = addTodo;
const getTodos = async (req, res) => {
    const userId = req.userId; // Assume middleware adds userId to req
    try {
        const todos = await Todo_1.Todo.findAll({ where: { user_id: userId } });
        res.json({ todos });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getTodos = getTodos;
