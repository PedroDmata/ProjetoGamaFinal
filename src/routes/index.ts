import { Router } from "express";
import requestLog from '../middlewares/requestLog';
import produtosControllers from "../controllers/controllerProdutos";
import controller from "../controllers/controllerpedidos"
import usuariosControllers from "../controllers/controllerUsuario";
import categoriaController from '../controllers/categoriasController';


const routes = Router();

//rotas categorias

routes.get('/categoria', requestLog, categoriaController.listarCategoria);
routes.get('/categoria/:id', categoriaController.listarcategoriaId);
routes.post('/categoria', categoriaController.cadastrarCategoria);
routes.put('/categoria/:id', categoriaController.atualizarCategoria);
routes.delete('/categoria/:id', categoriaController.deletarCategoria);

//rotas produtos

routes.get("/produtos", produtosControllers.list);
routes.get("/produtos/:id", produtosControllers.getProdutoID);
routes.post("/produtos", produtosControllers.create);
routes.put("/produtos/:id", produtosControllers.update);
routes.delete("/produtos/:id", produtosControllers.delete);


//rotas pedidos
routes.post('/pedidos', controller.create);
routes.get('/pedidos',controller.list);
routes.get('/pedidos:id',controller.getpedidoid);

// rotas usuarios

routes.get("/usuario", usuariosControllers.list);
routes.get("/usuario/:id",usuariosControllers.getUsuarioID);
routes.post("/usuario" , usuariosControllers.create);
routes.put("/usuario/:id", usuariosControllers.update);
routes.delete("/usuario/:id", usuariosControllers.delete);


export default routes;