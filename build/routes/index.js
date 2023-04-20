"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requestLog_1 = __importDefault(require("../middlewares/requestLog"));
const controllerProdutos_1 = __importDefault(require("../controllers/controllerProdutos"));
const controllerpedidos_1 = __importDefault(require("../controllers/controllerpedidos"));
const controllerUsuario_1 = __importDefault(require("../controllers/controllerUsuario"));
const categoriasController_1 = __importDefault(require("../controllers/categoriasController"));
const routes = (0, express_1.Router)();
//rotas categorias
routes.get('/categoria', requestLog_1.default, categoriasController_1.default.listarCategoria);
routes.get('/categoria/:id', categoriasController_1.default.listarcategoriaId);
routes.post('/categoria', categoriasController_1.default.cadastrarCategoria);
routes.put('/categoria/:id', categoriasController_1.default.atualizarCategoria);
routes.delete('/categoria/:id', categoriasController_1.default.deletarCategoria);
//rotas produtos
routes.get("/produtos", controllerProdutos_1.default.list);
routes.get("/produtos/:id", controllerProdutos_1.default.getProdutoID);
routes.post("/produtos", controllerProdutos_1.default.create);
routes.put("/produtos/:id", controllerProdutos_1.default.update);
routes.delete("/produtos/:id", controllerProdutos_1.default.delete);
//rotas pedidos
routes.post('/pedidos', controllerpedidos_1.default.create);
routes.get('/pedidos', controllerpedidos_1.default.list);
routes.get('/pedidos:id', controllerpedidos_1.default.getpedidoid);
// rotas usuarios
routes.get("/usuario", controllerUsuario_1.default.list);
routes.get("/usuario/:id", controllerUsuario_1.default.getUsuarioID);
routes.post("/usuario", controllerUsuario_1.default.create);
routes.put("/usuario/:id", controllerUsuario_1.default.update);
routes.delete("/usuario/:id", controllerUsuario_1.default.delete);
exports.default = routes;
