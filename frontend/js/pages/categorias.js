var modal = new bootstrap.Modal(document.getElementById('modal'));
var modalToast = new bootstrap.Toast(document.getElementById('toast'));
var modalFiltro = new bootstrap.Modal(document.getElementById('modalFiltro'));

function init() {
    getCategorias();

    document.querySelector('#cancelar').onclick = function () {
        fecharModal()
    }

    document.querySelector('#imgFechar').onclick = function () {
        modalFiltro.hide()
    }

    document.getElementById("inputPesquisarCategoria").addEventListener("input", function () {
        const termo = this.value.toLowerCase();
        const itens = document.querySelectorAll("#listaCategorias tr");
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

        const lista = document.getElementById("listaCategorias");

        const msgAnterior = lista.querySelector(".mensagem-vazia");
        if (msgAnterior) {
            msgAnterior.remove();
        }

        if (!encontrou) {
            const tr = document.createElement("tr");
            tr.append(montaTd("Nenhuma categoria encontrada", "mensagem-vazia", "", 6));
            lista.append(tr);
        }
    });
}

function fecharModal() {
    modal.hide()
}

function listaCategorias(dados) {
    var lista = document.getElementById("listaCategorias");
    lista.innerHTML = "";
    if (dados.message != null) {
        if (dados.message.length == 0) {
            var tr = document.createElement("tr");
            tr.append(montaTd("Nenhuma categoria encontrada", "mensagem-vazia", "", 6));
            lista.append(tr);
        } else {
            for (var dado of dados.message) {
                var tr = document.createElement("tr");
                tr.append(montaTd((dado.idcategoria == null ? "-" : dado.idcategoria), "colunaInteiro"));
                tr.append(montaTd((dado.descricao == null ? "-" : dado.descricao.toUpperCase()), "", "", 2));
                tr.append(montaTdIcon('<div class="circle" style="background-color:' + dado.cor + ';"></div>', "colunaInteiro", ''));
                var icon = dado.ativo == "false" ? '<i id="nocheck" class="ph ph-x-circle"></i>' : '<i id="check" class="ph ph-check-circle"></i>';
                var titleicon = dado.ativo == "false" ? "Inativo" : 'Ativo';
                tr.append(montaTdIcon(icon, "colunaIcone", titleicon));
                tr.append(montaTdIcon('<i onclick="getCategoria(' + dado.idcategoria + ')" class="ph ph-pencil-simple click"></i>', "colunaIcone", 'Editar'));

                lista.append(tr);
            }

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
    document.querySelector('#inputativo').value = 'true';
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
    categoria.ativo = (inputativo.value == "true" ? 1 : 0);

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

function abrirFiltro() {
    document.querySelector("#limparfiltro").onclick = function () {
        document.querySelector("#inputdescricaofiltro").value = '';
        document.querySelector("#inputsituacaofiltro").value = '';
        getCategorias(true);
    }

    document.querySelector("#filtrar").onclick = function () {
        getCategorias(true);
    }
    modalFiltro.show()
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});