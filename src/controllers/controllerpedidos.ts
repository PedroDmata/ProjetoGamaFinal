import { Request, Response } from "express";
import logger from "../logger/index";
import PedidosModel, { Pedidos } from "../models/pedidos";
const pedidosController = {
  async create(req: Request,  res: Response){
   try {
    logger.info("[pedidosController] - Iniciando criação do pedido")
    const { nome_user, descricao } = req.body
    logger.info(`[pedidosController] - payload: ${JSON.stringify(Object.assign({},req.body))}`)
    
    const newPedidos = await PedidosModel.create({descricao, nome_user, created_at: new Date(), updated_at: new Date()})
    logger.info("[pedidosController] - Pedido realizada com sucesso!")
    return res.json(newPedidos)
   } catch (error) {
    logger.error(`[pedidosController] error: ${error}`)
      return res.status(500).json("Algo deu errado")
   }
  },
  async list(req: Request,  res: Response){
    try {
      const pedidos = await PedidosModel.findAll({
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

    const pedidoid = await PedidosModel.findByPk(id);
        return res.json(pedidoid)
        

   },
    async updatepedido(req:Request, res:Response){
      const {id} = req.params
      const pedidoupdate = await PedidosModel.findByPk(id);
      return res.json(pedidoupdate)
 
    },

    async deletepedido(req:Request, res:Response){
      const {id}= req.params
      const pedidodelet = await PedidosModel.findByPk(id);
      await PedidosModel.destroy({where:{id}});
      return res.status(200).json({message:"deletado", data:pedidodelet})

    }
    
  };

export default pedidosController