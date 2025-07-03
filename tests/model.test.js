const Categoria = require('../model/Categoria');
const Financeiro = require('../model/Financeiro');
const Response = require('../model/Response');
const Tipo = require('../model/Tipo');

describe('Models', () => {
  test('instancia Categoria', () => {
    const c = new Categoria(1, 'desc', 'cor', 1);
    expect(c).toBeInstanceOf(Categoria);
  });

  test('instancia Financeiro', () => {
    const f = new Financeiro(1, 'desc', '2023-01-01', 1, 'tipo', 100, '2023-01-02');
    expect(f).toBeInstanceOf(Financeiro);
  });

  test('instancia Response', () => {
    const r = new Response(true, 'ok');
    expect(r).toBeInstanceOf(Response);
  });

  test('Tipo contém ENTRADA e SAIDA', () => {
    expect(Tipo.ENTRADA).toBe('ENTRADA');
    expect(Tipo.SAIDA).toBe('SAIDA');
  });
}); 