var modal = new bootstrap.Modal(document.getElementById('modal'));
var modalToast = new bootstrap.Toast(document.getElementById('toast'));
var modalFiltro = new bootstrap.Toast(document.getElementById('modalFiltro'));

function init() {
    getCategorias();

    document.querySelector('#cancelar').onclick = function () {
        fecharModal()
    }
}

function fecharModal() {
    modal.hide()
}

function listaCategorias(dados) {
    var lista = document.getElementById("listaCategorias");
    lista.innerHTML = "";
    if (dados.message != null) {
        for (var dado of dados.message) {
            var tr = document.createElement("tr");
            tr.append(montaTd((dado.idcategoria == null ? "-" : dado.idcategoria), "colunaInteiro"));
            tr.append(montaTd((dado.descricao == null ? "-" : dado.descricao.toUpperCase()), "", "", 2));
            tr.append(montaTdIcon('<div class="circle" style="background-color:' + dado.cor + ';"></div>', "colunaInteiro", ''));
            var icon = dado.ativo == false ? '<i id="nocheck" class="ph ph-x-circle"></i>' : '<i id="check" class="ph ph-check-circle"></i>';
            var titleicon = dado.ativo == 0 ? "Inativo" : 'Ativo';
            tr.append(montaTdIcon(icon, "colunaIcone", titleicon));
            tr.append(montaTdIcon('<i onclick="getCategoria(' + dado.idcategoria + ')" class="ph ph-pencil-simple click"></i>', "colunaIcone", 'Editar'));

            lista.append(tr);
        }
    }
}
// ################### MODAL ###################

function novaCategoria() {
    // alterar titulo
    document.querySelector('#tituloModal').innerHTML = "Nova categoria";
    // limpar campos
    document.querySelector('#inputdescricao').value = '';
    document.querySelector('#inputcor').value = '';
    document.querySelector('#inputativo').value = '';
    // remover erros
    document.querySelector('#inputdescricao').classList.remove('inputError');
    document.querySelector('#inputcor').classList.remove('inputError');
    document.querySelector('#inputativo').classList.remove('inputError');
    // botao salvar
    document.querySelector('#salvar').onclick = function () {
        salvar()
    }
    // abrir modal
    modal.show();
}

function editar(dados) {
    //alterar titulo
    document.querySelector('#tituloModal').innerHTML = "Alterar categoria";
    // preencher campos
    document.querySelector('#inputdescricao').value = dados.descricao;
    document.querySelector('#inputcor').value = dados.cor;
    document.querySelector('#inputativo').value = dados.ativo;
    // remover erros
    document.querySelector('#inputdescricao').classList.remove('inputError');
    document.querySelector('#inputcor').classList.remove('inputError');
    document.querySelector('#inputativo').classList.remove('inputError');
    // botao salvar
    document.querySelector('#salvar').onclick = function () {
        salvar(dados.idcategoria)
    }
    // abrir modal
    modal.show();
}

function salvar(id) {
    const inputdescricao = document.querySelector('#inputdescricao');
    const inputcor = document.querySelector('#inputcor');
    const inputativo = document.querySelector('#inputativo');

    let categoria = {};
    categoria.descricao = inputdescricao.value.trim();
    categoria.cor = inputcor.value.trim();
    categoria.ativo = inputativo.value == "true" ? true : false;

    if (validarInputs(inputdescricao, inputcor, inputativo)) {
        if (id) {
            putCategoria(categoria, id)
        } else {
            postCategoria(categoria)
        }
    } else {
        toast('Preencha todos os campos!', false)
    }
}
// ################### TABELA ###################

function pesquisar() {
    var icone = document.querySelector('#imgPesquisa')
    var descricao = document.querySelector('#inputPesquisar');
    if (icone.src.includes('pesquisa.png')) {
        icone.src = 'img/close.png'
        getCategorias(descricao.value)
    } else if (icone.src.includes('close.png')) {
        icone.src = 'img/pesquisa.png'
        descricao.value = ''
        getCategorias()
    }
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});