import { Request, Response } from "express";
import logger from "../logger/index";
import Clientes from "../models/usuarios";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

//criando usuario

const usuariosControllers = {
    async create(req: Request, res: Response, ){
        try{
            const { nome, email, senha, endereco, telefone } = req.body;
            logger.info(`[usuarioControllers] - payload: ${JSON.stringify(Object.assign({}, req.body) ) }`
            );

            const passwordHash = await hash(senha, 10);

            const newUsers = await Clientes.create({
                nome,
                email,  
                senha: passwordHash,
                endereco,
                telefone,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            logger.info("[usuarioControllers] - Usuario adicionado com sucesso!! ;) ")
            return  res.json(newUsers);
        } catch (error){
            logger.error(`[usuariosControllers] error: ${error}`);
            return res.status(500).json("Algo errado! Verifique novamente");
        }
    },

    //listar usuarios

    async list(req: Request, res: Response){
        try{
            const usuarios = await Clientes.findAll({
                raw:true,
            }) as unknown as Clientes[];

            const usuarioMapped = usuarios.map((usuario) =>{

                return { ...usuario};
            });

            return res.json(usuarioMapped);
        } catch(error){
            console.log(error);
            return res.status(500).json("Tem algo estranho");
        }
    },

    

    async getUsuarioID (req: Request, res: Response){
        const {id} = req.params;

        const usuario = await Clientes.findByPk(id);
        return res.json(usuario);
    },

    //atualizar usuario

    async update (req: Request, res: Response){
        try{
            const {id} = req.params;
            const {nome, email, senha} = req.body;

            const usuario = await Clientes.findByPk(id);

            if (!usuario){
                return res.status(404).json("Usuário não encontrado");
            }

            await usuario.update({ nome, email, senha});

            return res.json(usuario);
        } catch(error) {
            console.log(error);
            return res.status(500).json("A algo errado!");
        }
        
    },

    //deletar usuario

    async delete(req: Request, res: Response){
        try{
            const {id} = req.params;
            const usuario = await Clientes.findByPk(id);

            if (!usuario){
                return res.status(404).json("Usuário não encontrado");
            }

            await usuario.destroy();

            return res.json("Usuário excluído com sucesso");
        } catch (error) {
            console.log(error);
            return res.status(500).json("A algo de errado!!");
        }
    },

    // login de usuario

    async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            const usuario = await Clientes.findOne({
                where: { email }
            });

            if (!usuario) {
                return res.status(401).json("Usuário não encontrado");
            }

            const senhaCorreta = await compare(senha, usuario.senha);

            if (!senhaCorreta) {
                return res.status(401).json("Senha incorreta");
            }
            
            const token = sign(
                { userId: usuario.id, email: usuario.email },
                process.env.JWT_SECRET!,
                { expiresIn: '1h' }
            );

            return res.json({ token });
        } catch (error) {
            console.log(error);
            return res.status(500).json("A algo errado!");
        }
    },
};

export default usuariosControllers;