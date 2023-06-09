import { Request, Response } from "express";
import logger from "../logger/index";
import Pedidos from "../models/pedidos";
import produtosControllers from "./controllerProdutos";
import Clientes from "../models/usuarios";

//criar pedidos

const pedidosController = {
  async create(req: Request,  res: Response){
    try {
     logger.info("[pedidosController] - Iniciando criação do pedido")
     const {quantidade, produto_id, valor_total,cliente_id } = req.body
     logger.info(`[pedidosController] - payload: ${JSON.stringify(Object.assign({},req.body))}`)
     
     const newPedidos = await Pedidos.create({quantidade,produto_id, valor_total,cliente_id, createdAt: new Date(), updatedAt: new Date()})
     logger.info("[pedidosController] - Pedido realizada com sucesso!")
     return res.json(newPedidos)
    } catch (error) {
     logger.error(`[pedidosController] error: ${error}`)
       return res.status(500).json("Algo deu errado")
    }
   },

  //listar pedidos

  async list(req: Request,  res: Response){
    try {
      const pedidos = await Pedidos.findAll({
        raw: true
      }) as unknown as Pedidos[]

      console.log(pedidos)
      const pedidosMapped = pedidos.map( (pedidos) => {
        const urlCompleta = "/pedidos/" + pedidos

        return {...pedidos}
      })

      return res.json(pedidosMapped)
    } catch (error) {
      console.log(error)
      return res.status(500).json("Algo deu errado")
    }
  },

  async getpedidoid(req:Request, res:Response){
    const {id} = req.params

    const pedidoid = await Pedidos.findByPk(id);
        return res.json(pedidoid)       

   },

   //atualizar pedido

   async updatepedido (req:Request, res:Response){
    try{
      const {id}=req.params;
      const{valor_total}=req.body;
      const pedido = await Pedidos.findByPk(id);
      if(!pedido){
        return res.status(404).json("pedido não encontrado");
      }
      await pedido.update({valor_total});
      return res.json(pedido);
    }catch(error){
      console.log(error);
      return res.status(500).json("errado")
    }
   },
    //deletar pedido

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const pedido = await Pedidos.findByPk(id);

      if (!pedido) {
        return res.status(404).json("Pedido não encontrado");
      }

      await pedido.destroy();

      return res.json("Pedido excluído com sucesso");
    } catch (error) {
      console.log(error);
      return res.status(500).json("A algo errado!");
    }
  },
};
    
  

export default pedidosController