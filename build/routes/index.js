"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerProdutos_1 = __importDefault(require("../controllers/controllerProdutos"));
const controllerpedidos_1 = __importDefault(require("../controllers/controllerpedidos"));
const routes = (0, express_1.Router)();
//rotas produtos
routes.get("/produtos", controllerProdutos_1.default.list);
routes.get("/produtos/:id", controllerProdutos_1.default.getProdutoID);
routes.post("/produtos"), controllerProdutos_1.default.create;
routes.put("/produtos/:id", controllerProdutos_1.default.update);
routes.delete("/produtos/:id", controllerProdutos_1.default.delete);
//rotas pedidos
routes.post('/pedidos'), controllerpedidos_1.default.create;
routes.get('/pedidos'), controllerpedidos_1.default.list;
routes.get('/pedidos:id'), controllerpedidos_1.default.getpedidoid;
routes.post('/pedidos:id'), controllerpedidos_1.default.updatepedido;
routes.delete('/pedidos:id'), controllerpedidos_1.default.deletepedido;
exports.default = routes;
