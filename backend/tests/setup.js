// Configuração global para os testes
const path = require('path');

// Configurar variáveis de ambiente para teste
process.env.NODE_ENV = 'test';

// Configurar timeout global para testes
jest.setTimeout(10000);

// Configurar diretório de logs de teste
process.env.LOG_DIR = path.join(__dirname, 'logs');

// Mock do console para evitar spam durante os testes
global.console = {
    ...console,
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
}; 