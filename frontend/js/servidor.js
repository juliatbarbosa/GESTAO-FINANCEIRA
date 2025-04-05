function getTransacoes() {
    abrirLoading()

    fetch('http://127.0.0.1:3333/financeiro/financeiro'
        + '?descricao='
        + '&datainicio='
        + '&datafinal='
        + '&tipo='
        + '&idcategoria=',
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(dados => listaTransacoes(dados))
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharLoading()
        });
}

