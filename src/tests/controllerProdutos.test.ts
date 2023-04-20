import supertest from 'supertest';
import express, { Response, Request } from 'express';
import Sequelize from 'sequelize';
import Produtos from '../models/produtos';
import produtosController from '../controllers/controllerProdutos';

describe('Produtos Controller', () => {    
    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
      });

    const produtoMock: Produtos = { id: 1, nome_produto: 'Produto Teste', preco: '10.00', descricao: 'Teste descricao' }

    describe('função create', () => {
        it('Deve criar um novo produto', async () => {
          jest.spyOn(Produtos, 'create').mockResolvedValue(produtoMock);
      
          const req = {
            body: {
                nome_produto: 'Produto Teste',
                preco: '10.00',
                descricao: 'Teste descricao'
            }
          } as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await produtosController.create(req, res);
      
          expect(res.json).toHaveBeenCalledWith(produtoMock);
        });
    
        it('Deve retornar um erro 500', async () => {
            jest.spyOn(Produtos, 'create').mockRejectedValue(null);
      
            const req = {
              body: {
                  nome_produto: 'Produto Teste',
                  preco: '10.00',
                  descricao: 'Teste descricao'
              }
            } as unknown as Request;
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            } as unknown as Response;
        
            await produtosController.create(req, res);
        
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("Algo errado! Verifique novamente!");
        });
    });
    
    describe('função list', () => {
        it('Deve listar todos os produtos', async () => {
          jest.spyOn(Produtos, 'findAll').mockResolvedValue([produtoMock]);
      
          const req = {
            body: {
                nome_produto: 'Produto Teste',
                preco: '10.00',
                descricao: 'Teste descricao'
            }
          }as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await produtosController.list(req, res);
      
          expect(res.json).toHaveBeenCalledWith([produtoMock]);
        });
    
        it('Deve retornar um erro 500', async () => {
            jest.spyOn(Produtos, 'findAll').mockRejectedValue(null);
      
            const req = {
              body: {
                  nome_produto: 'Produto Teste',
                  preco: '10.00',
                  descricao: 'Teste descricao'
              }
            }as unknown as Request;
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            } as unknown as Response;
        
            await produtosController.list(req, res);
        
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("A algo errado!");
        });
    });
    
    describe('função update', () => {
        it('Deve atualizar um produto', async () => {
          jest.spyOn(Produtos, 'findByPk').mockResolvedValue({
            update: jest.fn()
          });
      
          const req = {
            params: {
                id: 1
            },
            body: {
                nome_produto: 'Produto Teste',
                preco: '10.00',
                descricao: 'Teste descricao'
            }
          }as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await produtosController.update(req, res);
      
          expect(res.status).not.toHaveBeenCalled();
          expect(res.json).toHaveBeenCalled();
        });
    
        it('Deve retornar um erro 500', async () => {
            jest.spyOn(Produtos, 'findByPk').mockRejectedValue(null);
          
              const req = {
                params: {
                    id: 1
                },
                body: {
                    nome_produto: 'Produto Teste',
                    preco: '10.00',
                    descricao: 'Teste descricao'
                }
              }as unknown as Request;
              const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
              } as unknown as Response;
          
              await produtosController.update(req, res);
          
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("A algo errado!");
        });
    });
    
    describe('função delete', () => {
        it('Deve deletar um produto', async () => {
          jest.spyOn(Produtos, 'findByPk').mockResolvedValue({
            destroy: jest.fn()
          });
      
          const req = {
            params: {
                id: 1
            },
          }as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await produtosController.delete(req, res);
      
          expect(res.status).not.toHaveBeenCalled();
          expect(res.json).toHaveBeenCalledWith("Produto excluído com sucesso");
        });
        
        it('Deve retornar 404 se não encontrar um produto', async () => {
          jest.spyOn(Produtos, 'findByPk').mockResolvedValue(null);
      
          const req = {
            params: {
                id: 1
            },
          }as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await produtosController.delete(req, res);
      
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith("Produto não encontrado");
        });
    
        it('Deve retornar um erro 500', async () => {
            jest.spyOn(Produtos, 'findByPk').mockRejectedValue(null);
          
            const req = {
            params: {
                id: 1
            },
            }as unknown as Request;
            const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            } as unknown as Response;
        
            await produtosController.delete(req, res);
          
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("A algo errado!");
        });
    });
  });