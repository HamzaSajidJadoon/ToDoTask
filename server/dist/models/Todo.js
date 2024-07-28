"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
class Todo extends sequelize_1.Model {
}
exports.Todo = Todo;
Todo.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    task: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Todo',
});
