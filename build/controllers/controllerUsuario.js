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
const usuarios_1 = __importDefault(require("../models/usuarios"));
const bcrypt_1 = require("bcrypt");
//criando usuario
const usuariosControllers = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                index_1.default.info("[usuarioControllers] - Usuario criado com sucesso");
                const { nome, email, senha, endereco, telefone } = req.body;
                index_1.default.info(`[usuarioControllers] - payload: ${JSON.stringify(Object.assign({}, req.body))}`);
                const passwordHash = yield (0, bcrypt_1.hash)(senha, 10);
                const newUsers = yield usuarios_1.default.create({
                    nome,
                    email,
                    senha: passwordHash,
                    endereco,
                    telefone
                });
                index_1.default.info("[usuarioControllers] - Usuario adicionado com sucesso!! ;) ");
                return res.json(newUsers);
            }
            catch (error) {
                index_1.default.error(`[usuariosControllers] error: ${error}`);
                return res.status(500).json("Algo errado! Verifique novamente");
            }
        });
    },
    //listar usuarios
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield usuarios_1.default.findAll({
                    raw: true,
                });
                const usuarioMapped = usuarios.map((usuario) => {
                    return Object.assign({}, usuario);
                });
                return res.json(usuarioMapped);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("Tem algo estranho");
            }
        });
    },
    getUsuarioID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield usuarios_1.default.findByPk(id);
            return res.json(usuario);
        });
    },
    //atualizar usuario
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nome, email, senha } = req.body;
                const usuario = yield usuarios_1.default.findByPk(id);
                if (!usuario) {
                    return res.status(404).json("Usuário não encontrado");
                }
                yield usuario.update({ nome, email, senha });
                return res.json(usuario);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("A algo errado!");
            }
        });
    },
    //deletar usuario
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const usuario = yield usuarios_1.default.findByPk(id);
                if (!usuario) {
                    return res.status(404).json("Usuário não encontrado");
                }
                yield usuario.destroy();
                return res.json("Usuário excluído com sucesso");
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("A algo de errado!!");
            }
        });
    },
};
exports.default = usuariosControllers;
