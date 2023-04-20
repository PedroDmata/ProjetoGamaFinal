import supertest from 'supertest';
import express, { Request, Response } from 'express';
import Sequelize from 'sequelize';
import Clientes from '../models/usuarios';
import usuariosController from '../controllers/controllerUsuario';

describe('Usuarios Controller', () => {    
    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
      });

    const usuarioMock: Clientes = { id: 1, nome: 'Usuario Teste', email: 'email@test.com', senha: 123, endereco: 'Endereço teste', telefone: 123456 }

    describe('função create', () => {
        it('Deve criar um novo pedido', async () => {
          jest.spyOn(Clientes, 'create').mockResolvedValue(usuarioMock);
      
          const req = {
            body: {
                nome: 'Usuario Teste',
                email: 'email@test.com',
                senha: 123,
                endereco: 'Endereço teste',
                telefone: 123456
            }
          } as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await usuariosController.create(req, res);
          
          expect(res.status).not.toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith(usuarioMock);
        });
    
        it('Deve retornar um erro 500', async () => {
            jest.spyOn(Clientes, 'create').mockRejectedValue(null);
      
            const req = {
              body: {
                  nome: 'Usuario Teste',
                  email: 'email@test.com',
                  senha: 123,
                  endereco: 'Endereço teste',
                  telefone: 123456
              }
            } as unknown as Request;
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            } as unknown as Response;
        
            await usuariosController.create(req, res);
        
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("Algo errado! Verifique novamente");
        });
    });
    
    describe('função list', () => {
        it('Deve listar todos os usuários', async () => {
          jest.spyOn(Clientes, 'findAll').mockResolvedValue([usuarioMock]);
      
          const req = {
            body: {
                nome: 'Usuario Teste',
                email: 'email@test.com',
                senha: 123,
                endereco: 'Endereço teste',
                telefone: 123456
            }
          }as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await usuariosController.list(req, res);
          
          expect(res.status).not.toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith([usuarioMock]);
        });
    
        it('Deve retornar um erro 500', async () => {
            jest.spyOn(Clientes, 'findAll').mockRejectedValue(null);
      
            const req = {
              body: {
                  nome: 'Usuario Teste',
                  email: 'email@test.com',
                  senha: 123,
                  endereco: 'Endereço teste',
                  telefone: 123456
              }
            } as unknown as Request;
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            } as unknown as Response;
        
            await usuariosController.list(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("Tem algo estranho");
        });
    });
    
    describe('função getUsuarioID', () => {
        it('Deve buscar um usuário', async () => {
          jest.spyOn(Clientes, 'findByPk').mockResolvedValue(usuarioMock);
      
          const req = {
            params: 1
          } as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await usuariosController.getUsuarioID(req, res);
          
          expect(res.json).toHaveBeenCalledWith(usuarioMock);
        });
    });
    
    describe('função update', () => {
        it('Deve atualizar um usuários', async () => {
          jest.spyOn(Clientes, 'findByPk').mockResolvedValue({
            update: jest.fn()
          });
      
          const req = {
            params: {
                id: 1
            },
            body: {
                nome: 'Usuario Teste',
                email: 'email@test.com',
                senha: 123,
            }
          } as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await usuariosController.update(req, res);
          
          expect(res.status).not.toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalled();
        });

        it('Deve retornar 404 se não encontrar um usuário', async () => {
          jest.spyOn(Clientes, 'findByPk').mockResolvedValue(null);
      
          const req = {
            params: {
                id: 1
            },
            body: {
                nome: 'Usuario Teste',
                email: 'email@test.com',
                senha: 123,
            }
          } as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await usuariosController.update(req, res);
          
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith("Usuário não encontrado");
        });
    
        it('Deve retornar um erro 500', async () => {
            jest.spyOn(Clientes, 'findByPk').mockRejectedValue(null);
      
            const req = {
              params: {
                  id: 1
              },
              body: {
                  nome: 'Usuario Teste',
                  email: 'email@test.com',
                  senha: 123,
              }
            } as unknown as Request;
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            } as unknown as Response;
        
            await usuariosController.update(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("A algo errado!");
        });
    });
    
    describe('função delete', () => {
        it('Deve remover um usuários', async () => {
          jest.spyOn(Clientes, 'findByPk').mockResolvedValue({
            destroy: jest.fn()
          });
      
          const req = {
            params: {
                id: 1
            },
          } as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await usuariosController.delete(req, res);
          
          expect(res.status).not.toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith("Usuário excluído com sucesso");
        });

        it('Deve retornar 404 se não encontrar um usuário', async () => {
          jest.spyOn(Clientes, 'findByPk').mockResolvedValue(null);
      
          const req = {
            params: {
                id: 1
            },
          } as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await usuariosController.delete(req, res);
          
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith("Usuário não encontrado");
        });
    
        it('Deve retornar um erro 500', async () => {
            jest.spyOn(Clientes, 'findByPk').mockRejectedValue(null);
      
            const req = {
              params: {
                  id: 1
              },
            } as unknown as Request;
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            } as unknown as Response;
        
            await usuariosController.delete(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("A algo de errado!!");
        });
    });
});
