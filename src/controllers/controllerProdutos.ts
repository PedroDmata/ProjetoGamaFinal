import { Request, Response } from "express";
import logger from "../logger/index";
import { Produtos } from "../models";

//criar produto

const produtosControllers = {
  async create(req: Request, res: Response) {
    try {
      logger.info("[produtosControllers] - Produto adicionado ao carrinho");
      const { nome_produto, descricao, preco } = req.body;
      logger.info(`[produtosControllers] - payload: ${JSON.stringify(Object.assign({}, req.body))}`
      );

      const newProduto = await Produtos.create({
        nome_produto,
        descricao,
        preco,
      });
      logger.info("[produtosControllers] - Produto adicionado com sucesso ;)");
      return res.json(newProduto);
    } catch (error) {
      logger.error(`[pedidosControllers] error: ${error}`);
      return res.status(500).json("Algo errado! Verifique novamente!");
    }
  },

  //listar produtos

  async list(req: Request, res: Response) {
    try {
      const produtos = await Produtos.findAll({
        raw: true,
      }) as unknown as Produtos[];

      const produtosMapped = produtos.map((produto) => {
        const urlCompleta = "/produtos/" + produto.id;

        return { ...produto };
      });

      return res.json(produtosMapped);
    } catch (error) {
      console.log(error);
      return res.status(500).json("A algo errado!");
    }
  },

  async getProdutoID(req: Request, res: Response) {
    const { id } = req.params;

    const produto = await Produtos.findByPk(id);
    return res.json(produto);
  },

  //atualizar produto

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome_produto, descricao, preco } = req.body;

      const produto = await Produtos.findByPk(id);

      if (!produto) {
        return res.status(404).json("Produto não encontrado");
      }

      await produto.update({ nome_produto, descricao, preco });

      return res.json(produto);
    } catch (error) {
      console.log(error);
      return res.status(500).json("A algo errado!");
    }
  },

  //deletar produto

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const produto = await Produtos.findByPk(id);

      if (!produto) {
        return res.status(404).json("Produto não encontrado");
      }

      await produto.destroy();

      return res.json("Produto excluído com sucesso");
    } catch (error) {
      console.log(error);
      return res.status(500).json("A algo errado!");
    }
  },
};

export default produtosControllers;
