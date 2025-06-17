const request = require('supertest');
const express = require('express');

// Mock do logger
jest.mock('../logger/Logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
    warning: jest.fn()
}));

// Mock dos serviços com dados simulados
const mockCategoriaService = {
    post: jest.fn((req, res) => {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ error: 'Nome é obrigatório' });
        }
        res.status(201).json({ 
            id: 1, 
            nome: nome,
            message: 'Categoria criada com sucesso' 
        });
    }),
    put: jest.fn((req, res) => {
        const { id, nome } = req.body;
        if (!id || !nome) {
            return res.status(400).json({ error: 'ID e nome são obrigatórios' });
        }
        res.status(200).json({ 
            id: id, 
            nome: nome,
            message: 'Categoria atualizada com sucesso' 
        });
    }),
    get: jest.fn((req, res) => {
        res.status(200).json({ 
            categorias: [
                { id: 1, nome: 'Alimentação' },
                { id: 2, nome: 'Transporte' },
                { id: 3, nome: 'Lazer' }
            ] 
        });
    })
};

const mockFinanceiroService = {
    post: jest.fn((req, res) => {
        const { descricao, valor, tipo, categoria_id } = req.body;
        if (!descricao || !valor || !tipo) {
            return res.status(400).json({ error: 'Descrição, valor e tipo são obrigatórios' });
        }
        res.status(201).json({ 
            id: 1, 
            descricao: descricao,
            valor: valor,
            tipo: tipo,
            categoria_id: categoria_id,
            message: 'Registro financeiro criado com sucesso' 
        });
    }),
    put: jest.fn((req, res) => {
        const { id, descricao, valor } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'ID é obrigatório' });
        }
        res.status(200).json({ 
            id: id, 
            descricao: descricao || 'Descrição atualizada',
            valor: valor || 0,
            message: 'Registro financeiro atualizado com sucesso' 
        });
    }),
    get: jest.fn((req, res) => {
        res.status(200).json({ 
            financeiros: [
                { id: 1, descricao: 'Salário', valor: 5000, tipo: 'receita', categoria_id: 1 },
                { id: 2, descricao: 'Almoço', valor: 25, tipo: 'despesa', categoria_id: 1 },
                { id: 3, descricao: 'Combustível', valor: 150, tipo: 'despesa', categoria_id: 2 }
            ] 
        });
    }),
    delete: jest.fn((req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'ID é obrigatório' });
        }
        res.status(200).json({ message: 'Registro financeiro deletado com sucesso' });
    }),
    getById: jest.fn((req, res) => {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: 'ID é obrigatório' });
        }
        res.status(200).json({ 
            financeiro: { 
                id: id, 
                descricao: 'Registro específico', 
                valor: 100, 
                tipo: 'receita' 
            } 
        });
    })
};

jest.mock('../service/CategoriaService', () => mockCategoriaService);
jest.mock('../service/CadastroFinanceiroService', () => mockFinanceiroService);

describe('Testes de Integração', () => {
    let app;
    
    beforeEach(() => {
        app = express();
        app.use(express.json());
        
        // Importar rotas
        const categoriaRoutes = require('../routes/CategoriaRoutes');
        const financeiroRoutes = require('../routes/FinanceiroRoutes');
        
        app.use('/categorias', categoriaRoutes);
        app.use('/financeiro', financeiroRoutes);
        
        // Limpar mocks
        jest.clearAllMocks();
    });
    
    describe('Fluxo Completo de Categorias', () => {
        test('deve criar, listar e atualizar categorias', async () => {
            // 1. Criar categoria
            const createResponse = await request(app)
                .post('/categorias/categoria')
                .send({ nome: 'Nova Categoria' })
                .expect(201);
            
            expect(createResponse.body).toHaveProperty('id', 1);
            expect(createResponse.body).toHaveProperty('nome', 'Nova Categoria');
            expect(mockCategoriaService.post).toHaveBeenCalledTimes(1);
            
            // 2. Listar categorias
            const listResponse = await request(app)
                .get('/categorias/categoria')
                .expect(200);
            
            expect(listResponse.body).toHaveProperty('categorias');
            expect(listResponse.body.categorias).toHaveLength(3);
            expect(mockCategoriaService.get).toHaveBeenCalledTimes(1);
            
            // 3. Atualizar categoria
            const updateResponse = await request(app)
                .put('/categorias/categoria')
                .send({ id: 1, nome: 'Categoria Atualizada' })
                .expect(200);
            
            expect(updateResponse.body).toHaveProperty('nome', 'Categoria Atualizada');
            expect(mockCategoriaService.put).toHaveBeenCalledTimes(1);
        });
        
        test('deve validar dados obrigatórios na criação de categoria', async () => {
            const response = await request(app)
                .post('/categorias/categoria')
                .send({})
                .expect(400);
            
            expect(response.body).toHaveProperty('error', 'Nome é obrigatório');
        });
    });
    
    describe('Fluxo Completo de Financeiro', () => {
        test('deve criar, listar, atualizar e deletar registros financeiros', async () => {
            // 1. Criar registro financeiro
            const createResponse = await request(app)
                .post('/financeiro/financeiro')
                .send({ 
                    descricao: 'Novo Registro',
                    valor: 100.50,
                    tipo: 'receita',
                    categoria_id: 1
                })
                .expect(201);
            
            expect(createResponse.body).toHaveProperty('id', 1);
            expect(createResponse.body).toHaveProperty('descricao', 'Novo Registro');
            expect(mockFinanceiroService.post).toHaveBeenCalledTimes(1);
            
            // 2. Listar registros financeiros
            const listResponse = await request(app)
                .get('/financeiro/financeiro')
                .expect(200);
            
            expect(listResponse.body).toHaveProperty('financeiros');
            expect(listResponse.body.financeiros).toHaveLength(3);
            expect(mockFinanceiroService.get).toHaveBeenCalledTimes(1);
            
            // 3. Buscar registro específico
            const getByIdResponse = await request(app)
                .get('/financeiro/financeiroeditar?id=1')
                .expect(200);
            
            expect(getByIdResponse.body).toHaveProperty('financeiro');
            expect(mockFinanceiroService.getById).toHaveBeenCalledTimes(1);
            
            // 4. Atualizar registro
            const updateResponse = await request(app)
                .put('/financeiro/financeiro')
                .send({ 
                    id: 1, 
                    descricao: 'Registro Atualizado',
                    valor: 200.00
                })
                .expect(200);
            
            expect(updateResponse.body).toHaveProperty('descricao', 'Registro Atualizado');
            expect(mockFinanceiroService.put).toHaveBeenCalledTimes(1);
            
            // 5. Deletar registro
            const deleteResponse = await request(app)
                .delete('/financeiro/financeiro')
                .send({ id: 1 })
                .expect(200);
            
            expect(deleteResponse.body).toHaveProperty('message', 'Registro financeiro deletado com sucesso');
            expect(mockFinanceiroService.delete).toHaveBeenCalledTimes(1);
        });
        
        test('deve validar dados obrigatórios na criação de registro financeiro', async () => {
            const response = await request(app)
                .post('/financeiro/financeiro')
                .send({ descricao: 'Teste' })
                .expect(400);
            
            expect(response.body).toHaveProperty('error', 'Descrição, valor e tipo são obrigatórios');
        });
        
        test('deve validar ID obrigatório na atualização', async () => {
            const response = await request(app)
                .put('/financeiro/financeiro')
                .send({ descricao: 'Teste' })
                .expect(400);
            
            expect(response.body).toHaveProperty('error', 'ID é obrigatório');
        });
    });
    
    describe('Cenários de Erro', () => {
        test('deve retornar 404 para rotas inexistentes', async () => {
            await request(app)
                .get('/rota-inexistente')
                .expect(404);
        });
        
        test('deve retornar 400 para dados inválidos', async () => {
            const response = await request(app)
                .post('/categorias/categoria')
                .send({ nome: '' })
                .expect(400);
            
            expect(response.body).toHaveProperty('error');
        });
    });
    
    describe('Performance e Concorrência', () => {
        test('deve lidar com múltiplas requisições simultâneas', async () => {
            const promises = [];
            
            // Criar 5 requisições simultâneas
            for (let i = 0; i < 5; i++) {
                promises.push(
                    request(app)
                        .get('/categorias/categoria')
                        .expect(200)
                );
            }
            
            const responses = await Promise.all(promises);
            
            // Todas as respostas devem ser bem-sucedidas
            responses.forEach(response => {
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('categorias');
            });
            
            // O serviço deve ter sido chamado 5 vezes
            expect(mockCategoriaService.get).toHaveBeenCalledTimes(5);
        });
    });
}); 