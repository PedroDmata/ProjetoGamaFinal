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
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const funcionarios_1 = __importDefault(require("../models/funcionarios"));
//criando funcionario
const funcionarioController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, email, senha } = req.body;
                index_1.default.info(`[funcionarioController] - payload: ${JSON.stringify(Object.assign({}, req.body))}`);
                const passwordHash = yield (0, bcrypt_1.hash)(senha, 10);
                const newUsers = yield funcionarios_1.default.create({
                    nome,
                    email,
                    senha: passwordHash,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                index_1.default.info("[funcionarioController] - funcionario adicionado com sucesso!! ;) ");
                return res.json(newUsers);
            }
            catch (error) {
                index_1.default.error(`[funcionarioController] error: ${error}`);
                return res.status(500).json("Algo errado! Verifique novamente");
            }
        });
    },
    //listar funcionarios
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const funcionarios = yield funcionarios_1.default.findAll({
                    raw: true,
                });
                const funcionariomapped = funcionarios.map((funcionarios) => {
                    return Object.assign({}, funcionarios);
                });
                return res.json(funcionariomapped);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("Tem algo estranho");
            }
        });
    },
    getfuncionarioID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const funcionario = yield funcionarios_1.default.findByPk(id);
            return res.json(funcionario);
        });
    },
    //atualizar usuario
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nome, email, senha } = req.body;
                const funcionario = yield funcionarios_1.default.findByPk(id);
                if (!funcionario) {
                    return res.status(404).json("funcionario não encontrado");
                }
                yield funcionario.update({ nome, email, senha });
                return res.json(funcionario);
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
                const funcionario = yield funcionarios_1.default.findByPk(id);
                if (!funcionario) {
                    return res.status(404).json("funcionario não encontrado");
                }
                yield funcionario.destroy();
                return res.json("funcionario excluído com sucesso");
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("A algo de errado!!");
            }
        });
    },
    // login de usuario
    loginf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, senha } = req.body;
                const funcionario = yield funcionarios_1.default.findOne({
                    where: { email }
                });
                if (!funcionario) {
                    return res.status(401).json("funcionario não encontrado");
                }
                const senhaCorreta = yield (0, bcrypt_1.compare)(senha, funcionario.senha);
                if (!senhaCorreta) {
                    return res.status(401).json("Senha incorreta");
                }
                const token = (0, jsonwebtoken_1.sign)({ userId: funcionario.id, email: funcionario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ token });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("A algo errado!");
            }
        });
    },
};
exports.default = funcionarioController;
