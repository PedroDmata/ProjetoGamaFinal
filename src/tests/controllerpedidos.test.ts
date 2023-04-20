import { Request, Response } from 'express';
import Pedidos from '../models/pedidos';
import pedidosController from '../controllers/controllerpedidos';


describe('Pedidos Controller', () => {    
    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
      });

    const pedidoMock: Pedidos = { id: 1, nome_user: 'Usuario Teste', valor_total: 10.1, descricao: 'Teste descricao', created_at: new Date(), updated_at: new Date(), } as Pedidos

    describe('função create', () => {
        it('Deve criar um novo pedido', async () => {
          jest.spyOn(Pedidos, 'create').mockResolvedValue(pedidoMock);
      
          const req = {
            body: {
                nome_user: 'Usuario Teste',
                valor_total: 10.1,
                descricao: 'Teste descricao'
            }
          } as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await pedidosController.create(req, res);
      
          expect(res.json).toHaveBeenCalledWith(pedidoMock);
        });
    
        it('Deve retornar um erro 500', async () => {
            jest.spyOn(Pedidos, 'create').mockRejectedValue(null);
      
            const req = {
              body: {
                  nome_user: 'Usuario Teste',
                  valor_total: 10.1,
                  descricao: 'Teste descricao'
              }
            } as unknown as Request;
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            } as unknown as Response;
        
            await pedidosController.create(req, res);
        
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("Algo deu errado");
        });
    });
    
    describe('função list', () => {
        it('Deve listar todos os pedidos', async () => {
          jest.spyOn(Pedidos, 'findAll').mockResolvedValue([pedidoMock]);
      
          const req = {
            body: {
                nome_user: 'Usuario Teste',
                valor_total: 10.1,
                descricao: 'Teste descricao'
            }
          } as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await pedidosController.list(req, res);
      
          expect(res.json).toHaveBeenCalledWith([pedidoMock]);
        });
    
        it('Deve retornar um erro 500', async () => {
            jest.spyOn(Pedidos, 'findAll').mockRejectedValue(null);
      
            const req = {
              body: {
                  nome_user: 'Usuario Teste',
                  valor_total: 10.1,
                  descricao: 'Teste descricao'
              }
            } as unknown as Request;
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            } as unknown as Response;
        
            await pedidosController.list(req, res);
        
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("Algo deu errado");
        });
    });
    
    describe('função getpedidoid', () => {
        it('Deve retornar um pedido', async () => {
          jest.spyOn(Pedidos, 'findByPk').mockResolvedValue(pedidoMock);
      
          const req = {
            params: {
                id: 1
            }
          } as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await pedidosController.getpedidoid(req, res);
      
          expect(res.json).toHaveBeenCalledWith(pedidoMock);
        });
    });
    
    describe('função updatepedido', () => {
        it('Deve atualizar um pedido', async () => {
          jest.spyOn(Pedidos, 'findByPk').mockResolvedValue({update: jest.fn()
          });
      
          const req = {
            params: {
                id: 1
            },
            body: {
                valor_total: 10.1,
                descricao: 'Teste descricao'
            }
          } as unknown as Request;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
      
          await pedidosController.updatepedido(req, res);
      
          expect(res.json).toHaveBeenCalled();
        });
        
        it('Deve retornar 404 se não encontrar um pedido', async () => {
            jest.spyOn(Pedidos, 'findByPk').mockResolvedValue(null);
        
            const req = {
                params: {
                    id: 1
                },
                body: {
                    valor_total: 10.1,
                    descricao: 'Teste descricao'
                }
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;
        
            await pedidosController.updatepedido(req, res);
      
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith("pedido não encontrado");
        });
    
        it('Deve retornar um erro 500', async () => {
            jest.spyOn(Pedidos, 'findByPk').mockRejectedValue(null);
        
            const req = {
                params: {
                    id: 1
                },
                body: {
                    valor_total: 10.1,
                    descricao: 'Teste descricao'
                }
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;
        
            await pedidosController.updatepedido(req, res);
      
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("errado");
        });
    });
  });