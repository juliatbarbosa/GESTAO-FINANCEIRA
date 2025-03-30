var obj = [
    {
        "descricao": "Salário",
        "valor": 5000.00,
        "categoria": "Renda",
        "cor_categoria": "#1ABC9C",
        "data": "2025-03-30",
        "tipo": "entrada"
    },
    {
        "descricao": "Aluguel",
        "valor": 1500.00,
        "categoria": "Moradia",
        "cor_categoria": "#2ECC71",
        "data": "2025-03-28",
        "tipo": "saida"
    },
    {
        "descricao": "Supermercado",
        "valor": 350.75,
        "categoria": "Alimentação",
        "cor_categoria": "#FF5733",
        "data": "2025-03-27",
        "tipo": "saida"
    },
    {
        "descricao": "Freelance",
        "valor": 1200.00,
        "categoria": "Renda Extra",
        "cor_categoria": "#27AE60",
        "data": "2025-03-25",
        "tipo": "entrada"
    },
    {
        "descricao": "Academia",
        "valor": 120.00,
        "categoria": "Saúde",
        "cor_categoria": "#E74C3C",
        "data": "2025-03-22",
        "tipo": "saida"
    },
    {
        "descricao": "Transporte",
        "valor": 80.50,
        "categoria": "Transporte",
        "cor_categoria": "#3498DB",
        "data": "2025-03-21",
        "tipo": "saida"
    },
    {
        "descricao": "Investimentos",
        "valor": 700.00,
        "categoria": "Investimentos",
        "cor_categoria": "#F1C40F",
        "data": "2025-03-20",
        "tipo": "entrada"
    },
    {
        "descricao": "Investimentos",
        "valor": 700.00,
        "categoria": "Investimentos",
        "cor_categoria": "#F1C40F",
        "data": "2025-03-20",
        "tipo": "entrada"
    }
]


function init() {
    listaTransacoes(obj);

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
        tr.append(montaTd((dado.valor == null ? "-" : "R$ " + formataMoeda(dado.valor)), dado.tipo));

        var categoria = document.createElement("div");
        categoria.classList.add("categoria");
        categoria.style.color = dado.cor_categoria;
        categoria.style.border = "1px solid " + dado.cor_categoria;
        categoria.innerText = dado.categoria.toUpperCase();

        tr.append(montaTdIcon(categoria.outerHTML, "", ''));
        tr.append(montaTdIcon('<i class="ph ph-pencil-simple"></i>', "colunaIcone", 'Editar'));
        tr.append(montaTdIcon('<i class="ph ph-trash"></i>', "colunaIcone", 'Excluir'));


        lista.append(tr);
    }


}

document.addEventListener("DOMContentLoaded", function () {
    init();
});