"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
class Pedidos extends sequelize_1.Model {
}
Pedidos.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome_user: {
        type: sequelize_1.DataTypes.STRING,
    },
    valor_total: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    descricao: {
        type: sequelize_1.DataTypes.STRING,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    tableName: 'pedidos',
    sequelize: db_1.default
});
exports.default = Pedidos;
