import { Request, Response } from "express";
import logger from "../logger/index";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import Funcionarios from "../models/funcionarios";

//criando funcionario

const funcionarioController = {
    async create(req: Request, res: Response, ){
        try{
            const { nome, email, senha } = req.body;
            logger.info(`[funcionarioController] - payload: ${JSON.stringify(Object.assign({}, req.body) ) }`
            );

            const passwordHash = await hash(senha, 10);

            const newUsers = await Funcionarios.create({
                nome,
                email,  
                senha: passwordHash,         
                createdAt: new Date(),
                updatedAt: new Date()
            });
            logger.info("[funcionarioController] - funcionario adicionado com sucesso!! ;) ")
            return  res.json(newUsers);
        } catch (error){
            logger.error(`[funcionarioController] error: ${error}`);
            return res.status(500).json("Algo errado! Verifique novamente");
        }
    },

    //listar funcionarios

    async list(req: Request, res: Response){
        try{
            const funcionarios = await Funcionarios.findAll ({
                raw:true,
            }) as unknown as Funcionarios[];

            const funcionariomapped = funcionarios.map((funcionarios) =>{

                return { ...funcionarios};
            });

            return res.json(funcionariomapped);
        } catch(error){
            console.log(error);
            return res.status(500).json("Tem algo estranho");
        }
    },

    

    async getfuncionarioID (req: Request, res: Response){
        const {id} = req.params;

        const funcionario = await Funcionarios.findByPk(id);
        return res.json(funcionario);
    },

    //atualizar usuario

    async update (req: Request, res: Response){
        try{
            const {id} = req.params;
            const {nome, email, senha} = req.body;

            const funcionario = await Funcionarios.findByPk(id);

            if (!funcionario){
                return res.status(404).json("funcionario não encontrado");
            }

            await funcionario.update({ nome, email, senha});

            return res.json(funcionario);
        } catch(error) {
            console.log(error);
            return res.status(500).json("A algo errado!");
        }
        
    },

    //deletar usuario

    async delete(req: Request, res: Response){
        try{
            const {id} = req.params;
            const funcionario = await Funcionarios.findByPk(id);

            if (!funcionario){
                return res.status(404).json("funcionario não encontrado");
            }

            await funcionario.destroy();

            return res.json("funcionario excluído com sucesso");
        } catch (error) {
            console.log(error);
            return res.status(500).json("A algo de errado!!");
        }
    },

    // login de usuario

    async loginf(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            const funcionario = await Funcionarios.findOne({
                where: { email }
            });

            if (!funcionario) {
                return res.status(401).json("funcionario não encontrado");
            }

            const senhaCorreta = await compare(senha, funcionario.senha);

            if (!senhaCorreta) {
                return res.status(401).json("Senha incorreta");
            }
            
            const token = sign(
                { userId: funcionario.id, email: funcionario.email },
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

export default funcionarioController;