class Categoria {
    constructor(idcategoria, descricao, cor, ativo = true) {
        this.idcategoria = idcategoria;
        this.descricao = descricao;
        this.cor = cor;
        this.ativo = ativo;
    }
}

module.exports = Categoria;