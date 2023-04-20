import { Request, Response } from 'express';
import Categoria from '../models/categorias';
import categoriasController from '../controllers/categoriasController';

describe('Categoria Controller', () => {    
    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
      });

    const categoriaMock = { id: 1, nome: 'Teste', descricao: 'Teste descricao' } as Categoria

    describe('função listarCategoria', () => {
        it('Deve listar todas as categorias', async () => {
          jest.spyOn(Categoria, 'findAll').mockResolvedValue([
            categoriaMock,
          ]);
          Categoria.findAll()
          const req = {} as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await categoriasController.listarCategoria(req, res);
      
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith([
            categoriaMock,
          ]);
        });
    
        it('Deve retornar um erro', async () => {
          jest.spyOn(Categoria, 'findAll').mockRejectedValueOnce({});
      
          const req = {} as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
          
          await categoriasController.listarCategoria(req, res);
      
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ error: {} });
        });
    });

    describe('listarcategoriaId', () => {      
        it('deve retornar uma categoria por ID', async () => {
            jest.spyOn(Categoria, 'findAll').mockResolvedValue([
                categoriaMock
              ]);
          
            const req = {
                params: {
                    id: 1
                }
            } as unknown as Request
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await categoriasController.listarcategoriaId(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                categoriaMock,
            ]);
        });
      
        it('deve retornar erro 404 se o ID não existir', async () => {
            jest.spyOn(Categoria, 'findAll').mockResolvedValue([]);
          
            const req = {
                params: {
                    id: 1
                }
            } as unknown as Request
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await categoriasController.listarcategoriaId(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith('Id não encontrado');
        });
      
        it('deve retornar erro 500 se ocorrer um erro interno do servidor', async () => {
            jest.spyOn(Categoria, 'findAll').mockResolvedValue([]);
          
            const req = {} as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await categoriasController.listarcategoriaId(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith('Erro interno do servidor');
        });
    });
    
    describe('cadastrarCategoria', () => {      
        it('deve cadastrar uma nova categoria', async () => {
            jest.spyOn(Categoria, 'create').mockResolvedValue(categoriaMock);
          
            const req = {
                body: {
                    id: 1,
                    nome: 'Teste',
                    descricao: 'Teste descricao'
                }
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await categoriasController.cadastrarCategoria(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(`Categoria ${categoriaMock.nome} cadastrada com sucesso!`);
        });
      
        it('deve retornar erro 400 se não conseguir criar a categoria', async () => {
            jest.spyOn(Categoria, 'create').mockResolvedValue(null);
          
            const req = {
                body: {
                    id: 1,
                    nome: 'Teste',
                    descricao: 'Teste descricao'
                }
            }as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await categoriasController.cadastrarCategoria(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith('Houve um erro na requisição. Por favor, tente novamente.');
        });
      
        it('deve retornar erro 500 se ocorrer um erro interno do servidor', async () => {
            jest.spyOn(Categoria, 'create').mockRejectedValue(null);
          
            const req = {
                body: {
                    id: 1,
                    nome: 'Teste',
                    descricao: 'Teste descricao'
                }
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await categoriasController.cadastrarCategoria(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith('Erro interno do servidor');
        });
    });
    
    describe('atualizarCategoria', () => {      
        it('deve cadastrar uma nova categoria', async () => {
            jest.spyOn(Categoria, 'update').mockResolvedValue([1]);
          
            const req = {
                body: {
                    nome: 'Teste',
                    descricao: 'Teste descricao'
                },
                params: {
                    id: 1,
                }
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await categoriasController.atualizarCategoria(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(`Informações da categoria ${categoriaMock.nome} atualizadas com sucesso!`);
        });
      
        it('deve retornar erro 400 se houver um erro na requisição', async () => {
            jest.spyOn(Categoria, 'update').mockResolvedValue([0]);
          
            const req = {
                body: {
                    nome: 'Teste',
                    descricao: 'Teste descricao'
                },
                params: {
                    id: 1,
                }
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await categoriasController.atualizarCategoria(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith('Houve um erro na requisição. Por favor, tente novamente.');
        });
      
        it('deve retornar erro 500 se ocorrer um erro interno do servidor', async () => {
            jest.spyOn(Categoria, 'update').mockResolvedValue([0]);
          
            const req = {} as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await categoriasController.atualizarCategoria(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith('Erro interno do servidor');
        });
    });
    
    describe('deletarCategoria', () => {      
        it('deve cadastrar uma nova categoria', async () => {
            jest.spyOn(Categoria, 'destroy').mockResolvedValue(1);
          
            const req = {
                params: {
                    id: 1,
                }
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                sendStatus: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown  as Response

            await categoriasController.deletarCategoria(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(204);
        });
      
        it('deve retornar erro 404 se não cosneguir deletar uma categoria', async () => {
            jest.spyOn(Categoria, 'destroy').mockResolvedValue(0);
          
            const req = {
                params: {
                    id: 1,
                }
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                sendStatus: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown  as Response

            await categoriasController.deletarCategoria(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith('Id não encontrado');
        });
      
        it('deve retornar erro 500 se ocorrer um erro interno do servidor', async () => {
            jest.spyOn(Categoria, 'destroy').mockRejectedValue(null);
          
            const req = {
                params: {
                    id: 1,
                }
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                sendStatus: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown  as Response

            await categoriasController.deletarCategoria(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith('Erro interno do servidor');
        });
    });
  });