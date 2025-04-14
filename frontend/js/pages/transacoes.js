var modal = new bootstrap.Modal(document.getElementById('modal'));
var modalToast = new bootstrap.Toast(document.getElementById('toast'));
var modalFiltro = new bootstrap.Modal(document.getElementById('modalFiltro'));
var modalExcluir = new bootstrap.Modal(document.getElementById('excluirTransacao'));

function init() {
    getListaCategorias()

    document.querySelector('#cancelar').onclick = function () {
        fecharModal()
    }

    document.querySelector('#imgFechar').onclick = function () {
        modalFiltro.hide()
    }

    document.querySelector('#naoExcluir').onclick = function () {
        modalExcluir.hide()
    }

    $('#inputvalor').on('input', function () {
        let valor = $(this).val().replace(/\D/g, '');
        valor = (parseFloat(valor) / 100).toFixed(2);
        valor = valor
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        $(this).val(valor);
    });

    document.getElementById("inputPesquisarTransacao").addEventListener("input", function () {
        const termo = this.value.toLowerCase();
        const itens = document.querySelectorAll("#listaTransacoes tr");
        let encontrou = false;

        itens.forEach(function (item) {
            const texto = item.textContent.toLowerCase();
            if (texto.includes(termo)) {
                item.style.display = "";
                encontrou = true;
            } else {
                item.style.display = "none";
            }
        });

        const lista = document.getElementById("listaTransacoes");

        const msgAnterior = lista.querySelector(".mensagem-vazia");
        if (msgAnterior) {
            msgAnterior.remove();
        }

        if (!encontrou) {
            const tr = document.createElement("tr");
            tr.append(montaTd("Nenhuma transação encontrada", "mensagem-vazia", "", 6));
            lista.append(tr);
        }
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

    if (dados.message != null) {

        if (dados.message.length == 0) {
            const tr = document.createElement("tr");
            tr.append(montaTd("Nenhuma transação encontrada", "", "", 6));
            lista.append(tr);

        } else {
            for (var dado of dados.message) {
                var tr = document.createElement("tr");
                tr.append(montaTd((dado.data == null ? "-" : formataData(dado.data)), "colunaData"));
                tr.append(montaTd((dado.desc_financeiro == null ? "-" : dado.desc_financeiro.toUpperCase()), "", "", 2));
                tr.append(montaTd((dado.valor == null ? "-" : "R$ " + formataMoeda(dado.valor)), (dado.tipo.toLowerCase())));
                if (dado.desc_categoria != null) {
                    var desc_categoria = document.createElement("div");
                    desc_categoria.classList.add("categoria");
                    desc_categoria.style.color = dado.cor;
                    desc_categoria.style.border = "1px solid " + dado.cor;
                    desc_categoria.innerText = dado.desc_categoria.toUpperCase();

                    tr.append(montaTdIcon(desc_categoria.outerHTML, "", ''));
                } else {
                    tr.append(montaTd("-", "", ""));
                }
                tr.append(montaTdIcon('<i onclick="getTransacao(' + dado.idfinanceiro + ')" class="ph ph-pencil-simple click"></i>', "colunaIcone", 'Editar'));
                tr.append(montaTdIcon('<i onclick="excluirTransacao(' + dado.idfinanceiro + ')" class="ph ph-trash click"></i>', "colunaIcone", 'Excluir'));


                lista.append(tr);
            }

        }
    } else {
        const tr = document.createElement("tr");
        tr.append(montaTd("Nenhuma transação encontrada", "", "", 6));
        lista.append(tr);
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
    document.querySelector('#inputdata').value = desformataData(dados.data);
    document.querySelector('#inputtipo').value = dados.tipo;
    document.querySelector('#inputcategoria').value = dados.idcategoria;
    document.querySelector('#inputvalor').value = (dados.valor == null ? "" : formataMoeda(dados.valor));
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

function excluirTransacao(id) {
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
    transacao.idcategoria = inputcategoria.value == "" ? "" : Number(inputcategoria.value);
    transacao.valor = parseFloat(inputvalor.value.replace(/\./g, "").replace(",", "."));

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

function abrirFiltro() {
    document.querySelector("#limparfiltro").onclick = function () {
        document.querySelector("#inputdescricaofiltro").value = '';
        document.querySelector("#inputdatainiciofiltro").value = '';
        document.querySelector("#inputdatafinalfiltro").value = '';
        document.querySelector("#inputtipofiltro").value = '';
        document.querySelector("#inputcategoriafiltro").value = '';
        getTransacoes(true);
    }

    document.querySelector("#filtrar").onclick = function () {
        getTransacoes(true);
    }
    modalFiltro.show()
}

function selectCategorias(categorias) {
    var select = document.querySelector('#inputcategoria')
    var selectfiltro = document.querySelector('#inputcategoriafiltro')

    select.innerHTML = ''
    selectfiltro.innerHTML = ''

    select.innerHTML = '<option value="">Selecione uma categoria</option>'
    categorias.forEach(categoria => {
        select.innerHTML += `<option value="${categoria.idcategoria}">${categoria.descricao.toUpperCase()}</option>`
    })

    selectfiltro.innerHTML = '<option value="">Selecione uma categoria</option>'
    categorias.forEach(categoria => {
        selectfiltro.innerHTML += `<option value="${categoria.idcategoria}">${categoria.descricao.toUpperCase()}</option>`
    })
}

function selectTipos(tipos) {
    var select = document.querySelector('#inputtipo')
    var selectfiltro = document.querySelector('#inputtipofiltro')

    select.innerHTML = ''
    selectfiltro.innerHTML = ''

    select.innerHTML = '<option value="">Selecione um tipo</option>'
    tipos.forEach(tipo => {
        select.innerHTML += `<option value="${tipo}">${tipo.toUpperCase()}</option>`
    })

    selectfiltro.innerHTML = '<option value="">Selecione um tipo</option>'
    tipos.forEach(tipo => {
        selectfiltro.innerHTML += `<option value="${tipo}">${tipo.toUpperCase()}</option>`
    })
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});