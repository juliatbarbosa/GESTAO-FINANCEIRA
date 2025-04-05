function getListaCategorias() {
    abrirLoading()

    fetch('http://127.0.0.1:3333/componente/categoria?ativo=false',
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(dados => selectCategorias(dados.message))
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            getListaTipos()
        });
}

function getListaTipos() {

    fetch('http://127.0.0.1:3333/componente/tipo',
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(dados => selectTipos(dados.message))
        .catch(err => console.error("Erro ao buscar dados:", err))
        .finally(function () {
            getTransacoes()
        });
}