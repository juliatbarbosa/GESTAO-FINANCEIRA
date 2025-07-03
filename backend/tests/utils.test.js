require('../logger/Logger');

// Testes para funções utilitárias e validações

describe('Funções Utilitárias', () => {
    describe('Validação de Dados', () => {
        test('deve validar se um valor é um número válido', () => {
            const isValidNumber = (value) => {
                return typeof value === 'number' && !isNaN(value) && isFinite(value);
            };
            
            expect(isValidNumber(123)).toBe(true);
            expect(isValidNumber(123.45)).toBe(true);
            expect(isValidNumber(0)).toBe(true);
            expect(isValidNumber(-123)).toBe(true);
            expect(isValidNumber('123')).toBe(false);
            expect(isValidNumber(NaN)).toBe(false);
            expect(isValidNumber(Infinity)).toBe(false);
            expect(isValidNumber(null)).toBe(false);
            expect(isValidNumber(undefined)).toBe(false);
        });
        
        test('deve validar se uma string não está vazia', () => {
            const isValidString = (value) => {
                return typeof value === 'string' && value.trim().length > 0;
            };
            
            expect(isValidString('teste')).toBe(true);
            expect(isValidString('  teste  ')).toBe(true);
            expect(isValidString('')).toBe(false);
            expect(isValidString('   ')).toBe(false);
            expect(isValidString(123)).toBe(false);
            expect(isValidString(null)).toBe(false);
            expect(isValidString(undefined)).toBe(false);
        });
        
        test('deve validar formato de data', () => {
            const isValidDate = (dateString) => {
                if (!dateString) return false;
                const date = new Date(dateString);
                return date instanceof Date && !isNaN(date);
            };
            
            expect(isValidDate('2023-12-25')).toBe(true);
            expect(isValidDate('2023/12/25')).toBe(true);
            expect(isValidDate('2023-12-25T00:00:00.000Z')).toBe(true);
            expect(isValidDate('invalid-date')).toBe(false);
            expect(isValidDate('')).toBe(false);
            expect(isValidDate(null)).toBe(false);
        });
        
        test('deve validar email', () => {
            const isValidEmail = (email) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            };
            
            expect(isValidEmail('teste@exemplo.com')).toBe(true);
            expect(isValidEmail('usuario@dominio.org')).toBe(true);
            expect(isValidEmail('email.invalido')).toBe(false);
            expect(isValidEmail('@dominio.com')).toBe(false);
            expect(isValidEmail('usuario@')).toBe(false);
            expect(isValidEmail('')).toBe(false);
        });
    });
    
    describe('Formatação de Dados', () => {
        test('deve formatar valor monetário', () => {
            const formatCurrency = (value) => {
                return new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(value);
            };
            
            expect(formatCurrency(1234.56)).toMatch(/R\$\s*1\.234,56/);
            expect(formatCurrency(100)).toMatch(/R\$\s*100,00/);
            expect(formatCurrency(0)).toMatch(/R\$\s*0,00/);
            expect(formatCurrency(-123.45)).toMatch(/-R\$\s*123,45/);
        });
        
        test('deve formatar data para exibição', () => {
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleDateString('pt-BR');
            };
            
            expect(formatDate('2023-12-25T12:00:00.000Z')).toBe('25/12/2023');
            expect(formatDate('2023-01-01T12:00:00.000Z')).toBe('01/01/2023');
        });
        
        test('deve capitalizar primeira letra', () => {
            const capitalize = (str) => {
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
            };
            
            expect(capitalize('teste')).toBe('Teste');
            expect(capitalize('TESTE')).toBe('Teste');
            expect(capitalize('tEsTe')).toBe('Teste');
            expect(capitalize('')).toBe('');
        });
    });
    
    describe('Manipulação de Arrays', () => {
        test('deve filtrar array por propriedade', () => {
            const filterByProperty = (array, property, value) => {
                return array.filter(item => item[property] === value);
            };
            
            const data = [
                { id: 1, nome: 'Item 1', ativo: true },
                { id: 2, nome: 'Item 2', ativo: false },
                { id: 3, nome: 'Item 3', ativo: true }
            ];
            
            const ativos = filterByProperty(data, 'ativo', true);
            expect(ativos).toHaveLength(2);
            expect(ativos[0].id).toBe(1);
            expect(ativos[1].id).toBe(3);
        });
        
        test('deve ordenar array por propriedade', () => {
            const sortByProperty = (array, property, ascending = true) => {
                return array.sort((a, b) => {
                    if (ascending) {
                        return a[property] > b[property] ? 1 : -1;
                    } else {
                        return a[property] < b[property] ? 1 : -1;
                    }
                });
            };
            
            const data = [
                { id: 3, nome: 'C' },
                { id: 1, nome: 'A' },
                { id: 2, nome: 'B' }
            ];
            
            const ordenado = sortByProperty(data, 'nome');
            expect(ordenado[0].nome).toBe('A');
            expect(ordenado[1].nome).toBe('B');
            expect(ordenado[2].nome).toBe('C');
        });
        
        test('deve calcular soma de propriedade numérica', () => {
            const sumByProperty = (array, property) => {
                return array.reduce((sum, item) => sum + (item[property] || 0), 0);
            };
            
            const data = [
                { id: 1, valor: 100 },
                { id: 2, valor: 200 },
                { id: 3, valor: 300 }
            ];
            
            const total = sumByProperty(data, 'valor');
            expect(total).toBe(600);
        });
    });
    
    describe('Sanitização de Dados', () => {
        test('deve remover caracteres especiais', () => {
            const sanitizeString = (str) => {
                return str.replace(/[^a-zA-Z0-9\s]/g, '').trim();
            };
            
            expect(sanitizeString('teste@123!')).toBe('teste123');
            expect(sanitizeString('  teste  ')).toBe('teste');
            expect(sanitizeString('teste-123')).toBe('teste123');
        });
        
        test('deve limitar tamanho de string', () => {
            const truncateString = (str, maxLength) => {
                if (str.length <= maxLength) return str;
                return str.substring(0, maxLength) + '...';
            };
            
            expect(truncateString('teste longo', 5)).toBe('teste...');
            expect(truncateString('teste', 10)).toBe('teste');
            expect(truncateString('', 5)).toBe('');
        });
        
        test('deve converter para número seguro', () => {
            const safeNumber = (value) => {
                const num = parseFloat(value);
                return isNaN(num) ? 0 : num;
            };
            
            expect(safeNumber('123')).toBe(123);
            expect(safeNumber('123.45')).toBe(123.45);
            expect(safeNumber('invalid')).toBe(0);
            expect(safeNumber(null)).toBe(0);
            expect(safeNumber(undefined)).toBe(0);
        });
    });
}); 