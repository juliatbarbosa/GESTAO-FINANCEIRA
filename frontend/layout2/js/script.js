function init() {
    toggleMenu();
}

// Função que altera o conteúdo da página com base no item clicado
function carregaTela(event, page) {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página

    // Aqui você pode alterar o conteúdo da página com base na 'page'
    const content = document.getElementById("content");

    // Exemplo simples de troca de conteúdo
    if (page === "transacoes") {
        document.querySelector('.telaTransacoes').style.display = "";
        document.querySelector('.telaCategorias').style.display = "none";

        document.querySelector('.menuTransacoes').classList.add('active');
        document.querySelector('.menuCategorias').classList.remove('active');
    } else if (page === "categorias") {
        document.querySelector('.telaTransacoes').style.display = "none";
        document.querySelector('.telaCategorias').style.display = "";

        document.querySelector('.menuTransacoes').classList.remove('active');
        document.querySelector('.menuCategorias').classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});
