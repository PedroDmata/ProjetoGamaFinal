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
const pedidos_1 = __importDefault(require("../models/pedidos"));
//criar pedidos
const pedidosController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                index_1.default.info("[pedidosController] - Iniciando criação do pedido");
                const { quantidade, produto_id, valor_total, cliente_id } = req.body;
                index_1.default.info(`[pedidosController] - payload: ${JSON.stringify(Object.assign({}, req.body))}`);
                const newPedidos = yield pedidos_1.default.create({ quantidade, produto_id, valor_total, cliente_id, createdAt: new Date(), updatedAt: new Date() });
                index_1.default.info("[pedidosController] - Pedido realizada com sucesso!");
                return res.json(newPedidos);
            }
            catch (error) {
                index_1.default.error(`[pedidosController] error: ${error}`);
                return res.status(500).json("Algo deu errado");
            }
        });
    },
    //listar pedidos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pedidos = yield pedidos_1.default.findAll({
                    raw: true
                });
                console.log(pedidos);
                const pedidosMapped = pedidos.map((pedidos) => {
                    const urlCompleta = "/pedidos/" + pedidos;
                    return Object.assign({}, pedidos);
                });
                return res.json(pedidosMapped);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("Algo deu errado");
            }
        });
    },
    getpedidoid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pedidoid = yield pedidos_1.default.findByPk(id);
            return res.json(pedidoid);
        });
    },
    //atualizar pedido
    updatepedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { valor_total } = req.body;
                const pedido = yield pedidos_1.default.findByPk(id);
                if (!pedido) {
                    return res.status(404).json("pedido não encontrado");
                }
                yield pedido.update({ valor_total });
                return res.json(pedido);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("errado");
            }
        });
    },
    //deletar pedido
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const pedido = yield pedidos_1.default.findByPk(id);
                if (!pedido) {
                    return res.status(404).json("Pedido não encontrado");
                }
                yield pedido.destroy();
                return res.json("Pedido excluído com sucesso");
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("A algo errado!");
            }
        });
    },
};
exports.default = pedidosController;
