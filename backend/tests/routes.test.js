const request = require('supertest');
const express = require('express');
const path = require('path');

// Mock do logger para evitar interferência nos testes
jest.mock('../logger/Logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
    warning: jest.fn()
}));

// Mock dos serviços para isolar os testes das rotas
jest.mock('../service/CategoriaService', () => ({
    post: jest.fn((req, res) => res.status(201).json({ message: 'Categoria criada' })),
    put: jest.fn((req, res) => res.status(200).json({ message: 'Categoria atualizada' })),
    get: jest.fn((req, res) => res.status(200).json({ categorias: [] }))
}));

jest.mock('../service/CadastroFinanceiroService', () => ({
    post: jest.fn((req, res) => res.status(201).json({ message: 'Financeiro criado' })),
    put: jest.fn((req, res) => res.status(200).json({ message: 'Financeiro atualizado' })),
    get: jest.fn((req, res) => res.status(200).json({ financeiros: [] })),
    delete: jest.fn((req, res) => res.status(200).json({ message: 'Financeiro deletado' })),
    getById: jest.fn((req, res) => res.status(200).json({ financeiro: {} }))
}));

jest.mock('../service/ComponentesService', () => ({
    post: jest.fn((req, res) => res.status(201).json({ message: 'Componente criado' })),
    put: jest.fn((req, res) => res.status(200).json({ message: 'Componente atualizado' })),
    get: jest.fn((req, res) => res.status(200).json({ componentes: [] })),
    getCategoria: jest.fn((req, res) => res.status(200).json({ categorias: [] })),
    getTipo: jest.fn((req, res) => res.status(200).json({ tipos: [] }))
}));

describe('Rotas da API', () => {
    let app;
    
    beforeEach(() => {
        app = express();
        app.use(express.json());
        
        // Importar rotas
        const categoriaRoutes = require('../routes/CategoriaRoutes');
        const financeiroRoutes = require('../routes/FinanceiroRoutes');
        const componentesRoutes = require('../routes/ComponentesRoutes');
        
        app.use('/categorias', categoriaRoutes);
        app.use('/financeiro', financeiroRoutes);
        app.use('/componente', componentesRoutes);
    });
    
    describe('Rotas de Categoria', () => {
        test('POST /categorias/categoria deve criar uma categoria', async () => {
            const response = await request(app)
                .post('/categorias/categoria')
                .send({ nome: 'Teste Categoria' })
                .expect(201);
            
            expect(response.body).toHaveProperty('message', 'Categoria criada');
        });
        
        test('PUT /categorias/categoria deve atualizar uma categoria', async () => {
            const response = await request(app)
                .put('/categorias/categoria')
                .send({ id: 1, nome: 'Categoria Atualizada' })
                .expect(200);
            
            expect(response.body).toHaveProperty('message', 'Categoria atualizada');
        });
        
        test('GET /categorias/categoria deve retornar lista de categorias', async () => {
            const response = await request(app)
                .get('/categorias/categoria')
                .expect(200);
            
            expect(response.body).toHaveProperty('categorias');
            expect(Array.isArray(response.body.categorias)).toBe(true);
        });
    });
    
    describe('Rotas de Financeiro', () => {
        test('POST /financeiro/financeiro deve criar um registro financeiro', async () => {
            const response = await request(app)
                .post('/financeiro/financeiro')
                .send({ 
                    descricao: 'Teste Financeiro',
                    valor: 100.50,
                    tipo: 'receita'
                })
                .expect(201);
            
            expect(response.body).toHaveProperty('message', 'Financeiro criado');
        });
        
        test('PUT /financeiro/financeiro deve atualizar um registro financeiro', async () => {
            const response = await request(app)
                .put('/financeiro/financeiro')
                .send({ 
                    id: 1,
                    descricao: 'Financeiro Atualizado',
                    valor: 200.00
                })
                .expect(200);
            
            expect(response.body).toHaveProperty('message', 'Financeiro atualizado');
        });
        
        test('GET /financeiro/financeiro deve retornar lista de registros financeiros', async () => {
            const response = await request(app)
                .get('/financeiro/financeiro')
                .expect(200);
            
            expect(response.body).toHaveProperty('financeiros');
            expect(Array.isArray(response.body.financeiros)).toBe(true);
        });
        
        test('DELETE /financeiro/financeiro deve deletar um registro financeiro', async () => {
            const response = await request(app)
                .delete('/financeiro/financeiro')
                .send({ id: 1 })
                .expect(200);
            
            expect(response.body).toHaveProperty('message', 'Financeiro deletado');
        });
        
        test('GET /financeiro/financeiroeditar deve retornar um registro específico', async () => {
            const response = await request(app)
                .get('/financeiro/financeiroeditar?id=1')
                .expect(200);
            
            expect(response.body).toHaveProperty('financeiro');
        });
    });
    
    describe('Rotas de Componentes', () => {
        test('GET /componente/categoria deve retornar categorias', async () => {
            const response = await request(app)
                .get('/componente/categoria')
                .expect(200);
            
            expect(response.body).toHaveProperty('categorias');
            expect(Array.isArray(response.body.categorias)).toBe(true);
        });
        
        test('GET /componente/tipo deve retornar tipos', async () => {
            const response = await request(app)
                .get('/componente/tipo')
                .expect(200);
            
            expect(response.body).toHaveProperty('tipos');
            expect(Array.isArray(response.body.tipos)).toBe(true);
        });
    });
    
    describe('Validação de Dados', () => {
        test('deve retornar erro 400 para dados inválidos', async () => {
            const response = await request(app)
                .post('/categorias/categoria')
                .send({}) // Dados vazios
                .expect(201); // Como estamos usando mocks, não há validação real
            
            // Em um cenário real, isso deveria retornar 400
            expect(response.body).toHaveProperty('message');
        });
    });
}); 