"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../logger/index"));
const models_1 = require("../models");
//criar produto
const produtosControllers = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                index_1.default.info("[produtosControllers] - Produto adicionado ao carrinho");
                const { nome_produto, descricao, preco } = req.body;
                index_1.default.info(`[produtosControllers] - payload: ${JSON.stringify(Object.assign({}, req.body))}`);
                const newProduto = yield models_1.Produtos.create({
                    nome_produto,
                    descricao,
                    preco,
                });
                index_1.default.info("[produtosControllers] - Produto adicionado com sucesso ;)");
                return res.json(newProduto);
            }
            catch (error) {
                index_1.default.error(`[pedidosControllers] error: ${error}`);
                return res.status(500).json("Algo errado! Verifique novamente!");
            }
        });
    },
    //listar produtos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const produtos = yield models_1.Produtos.findAll({
                    raw: true,
                });
                const produtosMapped = produtos.map((produto) => {
                    const urlCompleta = "/produtos/" + produto.id;
                    return Object.assign({}, produto);
                });
                return res.json(produtosMapped);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("A algo errado!");
            }
        });
    },
    getProdutoID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const produto = yield models_1.Produtos.findByPk(id);
            return res.json(produto);
        });
    },
    //atualizar produto
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nome_produto, descricao, preco } = req.body;
                const produto = yield models_1.Produtos.findByPk(id);
                if (!produto) {
                    return res.status(404).json("Produto não encontrado");
                }
                yield produto.update({ nome_produto, descricao, preco });
                return res.json(produto);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("A algo errado!");
            }
        });
    },
    //deletar produto
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const produto = yield models_1.Produtos.findByPk(id);
                if (!produto) {
                    return res.status(404).json("Produto não encontrado");
                }
                yield produto.destroy();
                return res.json("Produto excluído com sucesso");
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("A algo errado!");
            }
        });
    },
};
exports.default = produtosControllers;
