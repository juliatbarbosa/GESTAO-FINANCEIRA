var modal = new bootstrap.Modal(document.getElementById('modal'));
var modalExcluir = new bootstrap.Modal(document.getElementById('excluir'));
var modalToast = new bootstrap.Toast(document.getElementById('toast'));


function init() {
    getListaCategorias()

    document.querySelector('#cancelar').onclick = function () {
        fecharModal()
    }

    document.querySelector('#naoExcluir').onclick = function () {
        modalExcluir.hide()
    }

    document.querySelector("#btnNovaTransacao").addEventListener("click", () => {
        document.querySelector('.modal').style.display = "block";
    });
}

function fecharModal() {
    modal.hide()
}

function listaTransacoes(dados) {
    var lista = document.getElementById("listaTransacoes");
    lista.innerHTML = "";

    document.querySelector('#valorEntradas').innerHTML = "R$ " + (dados.total_entrada == null ? "0,00" : formataMoeda(dados.total_entrada));
    document.querySelector('#valorSaidas').innerHTML = "R$ " + (dados.total_saida == null ? "0,00" : formataMoeda(dados.total_saida));
    document.querySelector('#valorTotal').innerHTML = "R$ " + (dados.total_geral == null ? "0,00" : formataMoeda(dados.total_geral));

    if (dados.dados != null) {

        for (var dado of dados.dados) {
            var tr = document.createElement("tr");
            tr.append(montaTd((dado.data == null ? "-" : formataData(dado.data)), "colunaData"));
            tr.append(montaTd((dado.desc_financeiro == null ? "-" : dado.desc_financeiro.toUpperCase()), "", "", 2));
            tr.append(montaTd((dado.valor == null ? "-" : "R$ " + formataMoeda(dado.valor)), (dado.tipo.toLowerCase())));
            if (dado.desc_categoria != null) {
                var desc_categoria = document.createElement("div");
                desc_categoria.classList.add("categoria");
                desc_categoria.style.color = dado.cor_categoria;
                desc_categoria.style.border = "1px solid " + dado.cor_categoria;
                desc_categoria.innerText = dado.desc_categoria.toUpperCase();

                tr.append(montaTdIcon(desc_categoria.outerHTML, "", ''));
            } else {
                tr.append(montaTd("-", "", ""));
            }
            tr.append(montaTdIcon('<i onclick="getTransacao(' + dado.idfinanceiro + ')" class="ph ph-pencil-simple"></i>', "colunaIcone", 'Editar'));


            lista.append(tr);
        }
    }


}

// ################### MODAL ###################

function novaTransacao() {
    // alterar titulo
    document.querySelector('#tituloModal').innerHTML = "Nova transação";
    // limpar campos
    document.querySelector('#inputdescricao').value = '';
    document.querySelector('#inputdata').value = '';
    document.querySelector('#inputtipo').value = '';
    document.querySelector('#inputcategoria').value = '';
    document.querySelector('#inputvalor').value = '';
    // remover erros
    document.querySelector('#inputdescricao').classList.remove('inputError');
    document.querySelector('#inputdata').classList.remove('inputError');
    document.querySelector('#inputtipo').classList.remove('inputError');
    document.querySelector('#inputcategoria').classList.remove('inputError');
    document.querySelector('#inputvalor').classList.remove('inputError');
    // botao salvar
    document.querySelector('#salvar').onclick = function () {
        salvar()
    }
    // abrir modal
    modal.show();
}

function editar(dados) {
    //alterar titulo
    document.querySelector('#tituloModal').innerHTML = "Alterar transação";
    // preencher campos
    document.querySelector('#inputdescricao').value = dados.descricao;
    document.querySelector('#inputdata').value = dados.data;
    document.querySelector('#inputtipo').value = dados.tipo;
    document.querySelector('#inputcategoria').value = dados.idcategoria;
    document.querySelector('#inputvalor').value = dados.valor;
    // remover erros
    document.querySelector('#inputdescricao').classList.remove('inputError');
    document.querySelector('#inputdata').classList.remove('inputError');
    document.querySelector('#inputtipo').classList.remove('inputError');
    document.querySelector('#inputcategoria').classList.remove('inputError');
    document.querySelector('#inputvalor').classList.remove('inputError');
    // botao salvar
    document.querySelector('#salvar').onclick = function () {
        salvar(dados.idfinanceiro)
    }
    // abrir modal
    modal.show();
}

function excluir(id) {
    modalExcluir.show()
    document.querySelector('#simExcluir').onclick = function () {
        deleteTransacao(id)
        modalExcluir.hide()
    }
}

function salvar(id) {
    const inputdescricao = document.querySelector('#inputdescricao');
    const inputdata = document.querySelector('#inputdata');
    const inputtipo = document.querySelector('#inputtipo');
    const inputcategoria = document.querySelector('#inputcategoria');
    const inputvalor = document.querySelector('#inputvalor');

    let transacao = {};
    transacao.descricao = inputdescricao.value.trim();
    transacao.data = inputdata.value.trim();
    transacao.tipo = inputtipo.value.trim();
    transacao.idcategoria = inputcategoria.value;
    transacao.valor = inputvalor.value.trim();

    if (validarInputs(inputdescricao, inputdata, inputtipo, inputcategoria, inputvalor)) {
        if (id) {
            putTransacao(transacao, id)
        } else {
            postTransacao(transacao)
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
        getTransacoes(descricao.value)
    } else if (icone.src.includes('close.png')) {
        icone.src = 'img/pesquisa.png'
        descricao.value = ''
        getTransacoes(null)
    }
}

function selectCategorias(categorias) {
    var select = document.querySelector('#inputcategoria')
    select.innerHTML = ''
    select.innerHTML = '<option value="">Selecione uma categoria</option>'
    categorias.forEach(categoria => {
        select.innerHTML += `<option value="${categoria.idcategoria}">${categoria.descricao}</option>`
    })
}

function selectTipos(tipos) {
    var select = document.querySelector('#inputtipo')
    select.innerHTML = ''
    select.innerHTML = '<option value="">Selecione um tipo</option>'
    tipos.forEach(tipo => {
        select.innerHTML += `<option value="${tipo}">${tipo}</option>`
    })
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});