# Biblioteca de Testes - Sistema de Gestão Financeira

Este diretório contém a biblioteca de testes completa para o sistema de gestão financeira, implementada com Jest e Supertest.

## 📁 Estrutura dos Testes

```
tests/
├── setup.js              # Configuração global dos testes
├── Logger.test.js        # Testes da classe Logger
├── routes.test.js        # Testes das rotas da API
├── server.test.js        # Testes do servidor e middleware
├── utils.test.js         # Testes de funções utilitárias
├── integration.test.js   # Testes de integração
└── README.md            # Este arquivo
```

## 🚀 Como Executar os Testes

### Instalar Dependências
```bash
cd backend
npm install
```

### Executar Todos os Testes
```bash
npm test
```

### Executar Testes em Modo Watch (desenvolvimento)
```bash
npm run test:watch
```

### Executar Testes com Cobertura
```bash
npm run test:coverage
```

### Executar Testes Específicos
```bash
# Testar apenas o Logger
npm test Logger.test.js

# Testar apenas as rotas
npm test routes.test.js

# Testar com padrão
npm test -- --testNamePattern="Logger"
```

## 📊 Tipos de Testes Implementados

### 1. Testes Unitários
- **Logger.test.js**: Testa a funcionalidade de logging
- **utils.test.js**: Testa funções utilitárias e validações

### 2. Testes de Integração
- **routes.test.js**: Testa as rotas da API com mocks
- **integration.test.js**: Testa fluxos completos da aplicação

### 3. Testes de Servidor
- **server.test.js**: Testa configuração do servidor e middleware

## 🎯 Funcionalidades Testadas

### Logger
- ✅ Criação de instância singleton
- ✅ Registro de mensagens (info, warning, error)
- ✅ Formatação de timestamp
- ✅ Criação automática de arquivo de log
- ✅ Recuperação de logs

### Rotas da API
- ✅ **Categorias**: POST, PUT, GET
- ✅ **Financeiro**: POST, PUT, GET, DELETE, GET by ID
- ✅ **Componentes**: POST, PUT, GET

### Validações
- ✅ Validação de dados obrigatórios
- ✅ Validação de tipos de dados
- ✅ Tratamento de erros
- ✅ Respostas HTTP corretas

### Funções Utilitárias
- ✅ Validação de números, strings, datas, emails
- ✅ Formatação de moeda e datas
- ✅ Manipulação de arrays
- ✅ Sanitização de dados

## 🔧 Configuração

### Jest Configuration (package.json)
```json
{
  "jest": {
    "testEnvironment": "node",
    "collectCoverageFrom": [
      "**/*.js",
      "!**/node_modules/**",
      "!**/coverage/**",
      "!**/tests/**"
    ],
    "coverageDirectory": "coverage",
    "coverageReporters": [
      "text",
      "lcov",
      "html"
    ]
  }
}
```

### Variáveis de Ambiente
- `NODE_ENV=test`: Configurado automaticamente nos testes
- `LOG_DIR`: Diretório para logs de teste

## 📈 Cobertura de Código

Após executar `npm run test:coverage`, você encontrará:

- **Relatório HTML**: `coverage/lcov-report/index.html`
- **Relatório LCOV**: `coverage/lcov.info`
- **Relatório de Console**: Mostra estatísticas no terminal

## 🧪 Estrutura de um Teste

```javascript
describe('Nome do Módulo', () => {
    let variavelCompartilhada;
    
    beforeEach(() => {
        // Setup antes de cada teste
        variavelCompartilhada = 'valor';
    });
    
    afterEach(() => {
        // Cleanup após cada teste
    });
    
    test('deve fazer algo específico', () => {
        // Arrange
        const input = 'dados de teste';
        
        // Act
        const result = funcaoTestada(input);
        
        // Assert
        expect(result).toBe('resultado esperado');
    });
});
```

## 🔍 Mocks e Stubs

### Mock do Logger
```javascript
jest.mock('../logger/Logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
    warning: jest.fn()
}));
```

### Mock de Serviços
```javascript
jest.mock('../service/CategoriaService', () => ({
    post: jest.fn((req, res) => res.status(201).json({ message: 'Sucesso' })),
    get: jest.fn((req, res) => res.status(200).json({ data: [] }))
}));
```

## 🚨 Tratamento de Erros

Os testes incluem cenários de erro:
- Dados inválidos
- Campos obrigatórios ausentes
- Rotas inexistentes
- Erros de servidor

## 📝 Logs de Teste

- Os testes criam logs temporários em `tests/test-logs.txt`
- Logs são limpos automaticamente após cada teste
- Console é mockado para evitar spam durante os testes

## 🔄 CI/CD

Para integração contínua, adicione ao seu pipeline:

```yaml
- name: Run Tests
  run: |
    cd backend
    npm install
    npm test
    npm run test:coverage
```

## 📚 Comandos Úteis

```bash
# Executar testes específicos
npm test -- --testPathPattern="Logger"

# Executar testes com verbose
npm test -- --verbose

# Executar testes com timeout personalizado
npm test -- --testTimeout=10000

# Executar testes em paralelo
npm test -- --maxWorkers=4
```

## 🎯 Próximos Passos

1. **Adicionar testes de banco de dados** com banco de teste
2. **Implementar testes de performance** com benchmarks
3. **Adicionar testes de segurança** (validação de entrada)
4. **Criar testes end-to-end** com Cypress ou Playwright
5. **Implementar testes de carga** com Artillery

## 📞 Suporte

Para dúvidas sobre os testes:
1. Verifique este README
2. Consulte a documentação do Jest
3. Analise os exemplos nos arquivos de teste
4. Execute `npm test -- --verbose` para mais detalhes 