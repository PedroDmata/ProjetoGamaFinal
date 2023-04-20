"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
class Clientes extends sequelize_1.Model {
}
Clientes.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    senha: {
        type: sequelize_1.DataTypes.STRING
    },
    endereco: {
        type: sequelize_1.DataTypes.STRING
    },
    telefone: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    tableName: 'clientes',
    sequelize: db_1.default
});
exports.default = Clientes;
