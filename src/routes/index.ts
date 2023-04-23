import { Router } from "express";
import requestLog from '../middlewares/requestLog';
import produtosControllers from "../controllers/controllerProdutos";
import controller from "../controllers/controllerpedidos"
import usuariosControllers from "../controllers/controllerUsuario";
import categoriaController from '../controllers/categoriasController';
import { authMiddleware } from "./authMiddleware";
import funcionarioController from "../controllers/controllerFuncionario";
import pedidosController from "../controllers/controllerpedidos";


const routes = Router();

//rotas categorias

routes.get('/categoria', authMiddleware, requestLog, categoriaController.listarCategoria);
routes.get('/categoria/:id', authMiddleware, categoriaController.listarcategoriaId);
routes.post('/categoria', authMiddleware, categoriaController.cadastrarCategoria);
routes.put('/categoria/:id', authMiddleware, categoriaController.atualizarCategoria);
routes.delete('/categoria/:id', authMiddleware, categoriaController.deletarCategoria);

//rotas produtos

routes.get("/produtos", authMiddleware, produtosControllers.list);
routes.get("/produtos/:id", authMiddleware, produtosControllers.getProdutoID);
routes.post("/produtos", authMiddleware, produtosControllers.create);
routes.put("/produtos/:id", authMiddleware, produtosControllers.update);
routes.delete("/produtos/:id", authMiddleware, produtosControllers.delete);


//rotas pedidos
routes.post('/pedidos', authMiddleware, pedidosController.create);
routes.get('/pedidos', authMiddleware, pedidosController.list);
routes.get('/pedidos:id', authMiddleware, pedidosController.getpedidoid);
routes.put('/pedidos:id', authMiddleware,pedidosController.updatepedido);
routes.delete('/pedidos:id',authMiddleware,pedidosController.delete);

// rotas usuarios

routes.post("/login", usuariosControllers.login);
routes.post("/usuario", usuariosControllers.create);

routes.get("/usuario", authMiddleware, usuariosControllers.list);
routes.get("/usuario/:id", authMiddleware, usuariosControllers.getUsuarioID);
routes.put("/usuario/:id", authMiddleware, usuariosControllers.update);
routes.delete("/usuario/:id", authMiddleware, usuariosControllers.delete);

//rotas funcionarios
routes.post("/funcionario", funcionarioController.create);
routes.post("/login/funcionario", funcionarioController.loginf);

routes.get("/funcionario", authMiddleware, usuariosControllers.list);
routes.get("/funcionario/:id", authMiddleware, usuariosControllers.getUsuarioID);
routes.put("/funcionario/:id", authMiddleware, usuariosControllers.update);
routes.delete("/funcionario/:id", authMiddleware, usuariosControllers.delete);



export default routes;