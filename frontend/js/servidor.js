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

function getTransacao(id) {
    abrirLoading()
    fetch("http://127.0.0.1:3333/financeiro/financeiroeditar?idfinanceiro=" + id,
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(dados => editar(dados))
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharLoading()
        });
}

function postTransacao(obj) {
    abrirLoading()
    let body = JSON.stringify(obj);
    let endereco = "http://127.0.0.1:3333/financeiro/financeiro";
    let metodo = "POST";

    fetch(endereco,
        {
            method: metodo,
            body: body,
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(function (retorno) {
            toast(retorno.message, retorno.success);
        })
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharModal();
            getTransacoes();
        });
}

function putTransacao(obj, id) {
    obj.idfinanceiro = id;
    abrirLoading()
    let body = JSON.stringify(obj);
    let endereco = "http://127.0.0.1:3333/financeiro/financeiro";
    let metodo = "PUT";
    
    fetch(endereco,
        {
            method: metodo,
            body: body,
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(function (retorno) {
            toast(retorno.message, retorno.success);
        })
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            fecharModal()
            getTransacoes();
        });
}
