var obj = [
    {
        "id": 1,
        "descricao": "Alimentação",
        "cor": "#FF5733"
    },
    {
        "id": 2,
        "descricao": "Transporte",
        "cor": "#3498DB"
    },
    {
        "id": 3,
        "descricao": "Moradia",
        "cor": "#2ECC71"
    },
    {
        "id": 4,
        "descricao": "Lazer",
        "cor": "#9B59B6"
    },
    {
        "id": 5,
        "descricao": "Saúde",
        "cor": "#E74C3C"
    },
    {
        "id": 6,
        "descricao": "Educação",
        "cor": "#F1C40F"
    },
    {
        "id": 7,
        "descricao": "Renda",
        "cor": "#1ABC9C"
    },
    {
        "id": 8,
        "descricao": "Investimentos",
        "cor": "#27AE60"
    }
]

function init() {
    listaCategorias(obj);
}

function listaCategorias(dados) {
    var lista = document.getElementById("listaCategorias");

    for (var dado of dados) {
        var tr = document.createElement("tr");
        tr.append(montaTd((dado.id == null ? "-" : dado.id), "colunaInteiro"));
        tr.append(montaTd((dado.descricao == null ? "-" : dado.descricao.toUpperCase()), "", "", 2));
        tr.append(montaTdIcon('<div class="circle" style="background-color:' + dado.cor + ';"></div>', "colunaInteiro", ''));
        tr.append(montaTdIcon('<i class="ph ph-pencil-simple"></i>', "colunaIcone", 'Editar'));
        tr.append(montaTdIcon('<i class="ph ph-trash"></i>', "colunaIcone", 'Excluir'));


        lista.append(tr);
    }


}

document.addEventListener("DOMContentLoaded", function () {
    init();
});