var modal = new bootstrap.Modal(document.getElementById('modal'));
var modalExcluir = new bootstrap.Modal(document.getElementById('excluirCadastro'));
var modalToast = new bootstrap.Toast(document.getElementById('toast'));


function init() {
    getTransacoes()

    document.querySelector('#cancelarCadastro').onclick = function () {
        modal.hide()
    }

    document.querySelector('#naoExcluir').onclick = function () {
        modalExcluir.hide()
    }

    document.querySelector("#btnNovaTransacao").addEventListener("click", () => {
        document.querySelector('.modal').style.display = "block";
    });
}

function listaTransacoes(dados) {
    var lista = document.getElementById("listaTransacoes");

    for (var dado of dados) {
        var tr = document.createElement("tr");
        tr.append(montaTd((dado.data == null ? "-" : formataData(dado.data)), "colunaData"));
        tr.append(montaTd((dado.descricao == null ? "-" : dado.descricao.toUpperCase()), "", "", 2));
        tr.append(montaTd((dado.valor == null ? "-" : "R$ " + formataMoeda(dado.valor)), (dado.tipo.toUpperCase() == 'SAÍDA' ? 'saida' : 'entrada') ));
        if (dado.categoria != null) {
            var categoria = document.createElement("div");
            categoria.classList.add("categoria");
            categoria.style.color = dado.cor_categoria;
            categoria.style.border = "1px solid " + dado.cor_categoria;
            categoria.innerText = dado.categoria.toUpperCase();

            tr.append(montaTdIcon(categoria.outerHTML, "", ''));
        } else {
            tr.append(montaTd("-", "", ""));
        }
        tr.append(montaTdIcon('<i class="ph ph-pencil-simple"></i>', "colunaIcone", 'Editar'));
        tr.append(montaTdIcon('<i class="ph ph-trash"></i>', "colunaIcone", 'Excluir'));


        lista.append(tr);
    }


}

// ################### MODAL ###################

function novoCadastro() {
    // alterar titulo
    document.querySelector('#tituloModal').innerHTML = "Novo medicamento";
    // limpar campos
    document.querySelector('#inputnome').value = '';
    document.querySelector('#inputquantidade').value = '';
    document.querySelector('#inputtipo').value = '';
    document.querySelector('#inputfabricante').value = '';
    // remover erros
    document.querySelector('#inputnome').classList.remove('inputError');
    document.querySelector('#inputquantidade').classList.remove('inputError');
    document.querySelector('#inputtipo').classList.remove('inputError');
    document.querySelector('#inputfabricante').classList.remove('inputError');
    // botao salvar
    document.querySelector('#salvarCadastro').onclick = function () {
        salvar()
    }
    // abrir modal
    modal.show();
}

function editarCadastro(dados) {
    //alterar titulo
    document.querySelector('#tituloModal').innerHTML = "Alterar medicamento";
    // preencher campos
    document.querySelector('#inputnome').value = dados.nome;
    document.querySelector('#inputquantidade').value = (dados.quantidade);
    document.querySelector('#inputtipo').value = dados.tipo;
    document.querySelector('#inputfabricante').value = dados.fabricante;
    // remover erros
    document.querySelector('#inputnome').classList.remove('inputError');
    document.querySelector('#inputquantidade').classList.remove('inputError');
    document.querySelector('#inputtipo').classList.remove('inputError');
    document.querySelector('#inputfabricante').classList.remove('inputError');
    // botao salvar
    document.querySelector('#salvarCadastro').onclick = function () {
        salvar(dados.idmedicamento)
    }
    // abrir modal
    modal.show();
}

function excluir(id) {
    modalExcluir.show()
    document.querySelector('#simExcluir').onclick = function () {
        deleteCadastro(id)
        modalExcluir.hide()
    }
}

function salvar(id) {
    console.log(id)
    const inputnome = document.querySelector('#inputnome');
    const inputquantidade = document.querySelector('#inputquantidade');
    const inputtipo = document.querySelector('#inputtipo');
    const inputfabricante = document.querySelector('#inputfabricante');

    let cadastro = {};
    cadastro.nome = inputnome.value.trim();
    cadastro.quantidade = inputquantidade.value.trim();
    cadastro.tipo = inputtipo.value.trim();
    cadastro.fabricante = inputfabricante.value.trim();

    if (validarInputs(inputnome, inputquantidade, inputtipo, inputfabricante)) {
        postPutCadastro(cadastro, id)
    } else {
        toast('Preencha todos os campos!', false)
    }
}
// ################### TABELA ###################

function pesquisar() {
    var icone = document.querySelector('#imgPesquisa')
    var nome = document.querySelector('#inputPesquisar');
    if (icone.src.includes('pesquisa.png')) {
        icone.src = 'img/close.png'
        getCadastros(nome.value)
    } else if (icone.src.includes('close.png')) {
        icone.src = 'img/pesquisa.png'
        nome.value = ''
        getCadastros(null)
    }
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});