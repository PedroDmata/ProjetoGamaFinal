import { Router } from "express";
import produtosControllers from "../controllers/controllerProdutos";
import controller from "../controllers/controllerpedidos"

const routes = Router();

//rotas produtos

routes.get("/produtos", produtosControllers.list);
routes.get("/produtos/:id", produtosControllers.getProdutoID);
routes.post("/produtos"), produtosControllers.create;
routes.put("/produtos/:id", produtosControllers.update);
routes.delete("/produtos/:id", produtosControllers.delete);


//rotas pedidos
routes.post('/pedidos'), controller.create
routes.get('/pedidos'),controller.list
routes.get('/pedidos:id'),controller.getpedidoid
routes.post('/pedidos:id'),controller.updatepedido   
routes.delete('/pedidos:id') ,controller.deletepedido



export default routes;