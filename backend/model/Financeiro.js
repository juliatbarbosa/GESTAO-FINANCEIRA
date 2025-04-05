class Financeiro {
    constructor(idfinanceiro, descricao, data, idcategoria, tipo, valor, dataalteracao) {
        this.idfinanceiro = idfinanceiro;
        this.descricao = descricao;
        this.data = data;
        this.idcategoria = idcategoria;
        this.tipo = tipo;
        this.valor = valor;
        this.dataalteracao = dataalteracao;
    }
}
module.exports = Financeiro;