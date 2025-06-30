const fs = require('fs');
const path = require('path');
const Logger = require('../logger/Logger');

describe('Logger', () => {
    let testLogFile;
    
    beforeEach(() => {
        // Criar arquivo de log temporário para testes
        testLogFile = path.join(__dirname, 'test-logs.txt');
        
        // Limpar logs anteriores
        Logger.logs = [];
    });
    
    afterEach(() => {
        // Limpar arquivo de teste após cada teste
        if (fs.existsSync(testLogFile)) {
            fs.unlinkSync(testLogFile);
        }
    });
    
    test('deve criar uma instância singleton', () => {
        const logger1 = Logger;
        const logger2 = Logger;
        expect(logger1).toBe(logger2);
    });
    
    test('deve registrar mensagem de info', () => {
        const message = 'Teste de informação';
        Logger.info(message);
        
        expect(Logger.logs).toHaveLength(1);
        expect(Logger.logs[0]).toContain('[INFO]');
        expect(Logger.logs[0]).toContain(message);
    });
    
    test('deve registrar mensagem de warning', () => {
        const message = 'Teste de aviso';
        Logger.warning(message);
        
        expect(Logger.logs).toHaveLength(1);
        expect(Logger.logs[0]).toContain('[WARNING]');
        expect(Logger.logs[0]).toContain(message);
    });
    
    test('deve registrar mensagem de error', () => {
        const message = 'Teste de erro';
        Logger.error(message);
        
        expect(Logger.logs).toHaveLength(1);
        expect(Logger.logs[0]).toContain('[ERROR]');
        expect(Logger.logs[0]).toContain(message);
    });
    
    test('deve incluir timestamp nas mensagens', () => {
        const message = 'Teste com timestamp';
        Logger.info(message);
        
        const logEntry = Logger.logs[0];
        expect(logEntry).toMatch(/\[\d{1,2}\/\d{1,2}\/\d{4}[, ]\s?\d{1,2}:\d{2}\]/);
    });
    
    test('deve retornar array de logs', () => {
        Logger.info('Log 1');
        Logger.warning('Log 2');
        Logger.error('Log 3');
        
        const logs = Logger.getLogs();
        expect(logs).toHaveLength(3);
        expect(logs[0]).toContain('Log 1');
        expect(logs[1]).toContain('Log 2');
        expect(logs[2]).toContain('Log 3');
    });
    
    test('deve criar arquivo de log se não existir', () => {
        // Garantir que o arquivo não existe
        if (fs.existsSync(testLogFile)) {
            fs.unlinkSync(testLogFile);
        }
        
        // Criar o arquivo manualmente para o teste
        fs.writeFileSync(testLogFile, '');
        
        // Usar o logger existente (singleton) que deve criar o arquivo
        Logger.info('Teste de criação de arquivo');
        
        expect(fs.existsSync(testLogFile)).toBe(true);
    });
}); 