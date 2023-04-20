"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
class Produtos extends sequelize_1.Model {
}
Produtos.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome_produto: {
        type: sequelize_1.DataTypes.STRING,
    },
    descricao: {
        type: sequelize_1.DataTypes.STRING,
    },
    preco: {
        type: sequelize_1.DataTypes.INTEGER
    },
}, {
    tableName: 'produtos',
    sequelize: db_1.default
});
exports.default = Produtos;
