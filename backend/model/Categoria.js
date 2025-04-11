class Categoria {
    constructor(idcategoria, descricao, cor, ativo) {
        this.idcategoria = idcategoria;
        this.descricao = descricao;
        this.cor = cor;
        this.ativo = ativo === 1 ? "true" : "false";
    }
}

module.exports = Categoria;