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
const authMiddleware_1 = require("./authMiddleware");
const routes = (0, express_1.Router)();
//rotas categorias
routes.get('/categoria', authMiddleware_1.authMiddleware, requestLog_1.default, categoriasController_1.default.listarCategoria);
routes.get('/categoria/:id', authMiddleware_1.authMiddleware, categoriasController_1.default.listarcategoriaId);
routes.post('/categoria', authMiddleware_1.authMiddleware, categoriasController_1.default.cadastrarCategoria);
routes.put('/categoria/:id', authMiddleware_1.authMiddleware, categoriasController_1.default.atualizarCategoria);
routes.delete('/categoria/:id', authMiddleware_1.authMiddleware, categoriasController_1.default.deletarCategoria);
//rotas produtos
routes.get("/produtos", authMiddleware_1.authMiddleware, controllerProdutos_1.default.list);
routes.get("/produtos/:id", authMiddleware_1.authMiddleware, controllerProdutos_1.default.getProdutoID);
routes.post("/produtos", authMiddleware_1.authMiddleware, controllerProdutos_1.default.create);
routes.put("/produtos/:id", authMiddleware_1.authMiddleware, controllerProdutos_1.default.update);
routes.delete("/produtos/:id", authMiddleware_1.authMiddleware, controllerProdutos_1.default.delete);
//rotas pedidos
routes.post('/pedidos', authMiddleware_1.authMiddleware, controllerpedidos_1.default.create);
routes.get('/pedidos', authMiddleware_1.authMiddleware, controllerpedidos_1.default.list);
routes.get('/pedidos:id', authMiddleware_1.authMiddleware, controllerpedidos_1.default.getpedidoid);
// rotas usuarios
routes.post("/login", controllerUsuario_1.default.login);
routes.post("/usuario", controllerUsuario_1.default.create);
routes.get("/usuario", authMiddleware_1.authMiddleware, controllerUsuario_1.default.list);
routes.get("/usuario/:id", authMiddleware_1.authMiddleware, controllerUsuario_1.default.getUsuarioID);
routes.put("/usuario/:id", authMiddleware_1.authMiddleware, controllerUsuario_1.default.update);
routes.delete("/usuario/:id", authMiddleware_1.authMiddleware, controllerUsuario_1.default.delete);
exports.default = routes;
