"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedidos = exports.Produtos = exports.Categoria = void 0;
const categorias_1 = __importDefault(require("./categorias"));
exports.Categoria = categorias_1.default;
const pedidos_1 = __importDefault(require("./pedidos"));
exports.Pedidos = pedidos_1.default;
const produtos_1 = __importDefault(require("./produtos"));
exports.Produtos = produtos_1.default;
