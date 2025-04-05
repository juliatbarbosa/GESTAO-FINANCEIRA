function montaTd(dado, classe, titulo, colspan) {
    var td = document.createElement("td")
    if (classe != undefined) {
        td.classList += classe;
    }
    if (titulo != undefined) {
        td.title = titulo
    }
    if (colspan != undefined) {
        td.colSpan = colspan
    }

    td.textContent = dado
    return td
}
function montaTdIcon(icon, classe, titulo) {
    var td = document.createElement("td")
    td.classList += classe
    td.innerHTML = icon
    if (titulo != undefined) {
        td.title = titulo
    }
    return td
}

function formataMoeda(valor, casasdecimais) {
    if (casasdecimais == undefined) {
        casasdecimais = 2
    }
    const valorFormatado = valor.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: casasdecimais });
    return valorFormatado;
}

function formataData(data) {
    const dataFormatada = moment(data).format('DD/MM/YYYY');
    return dataFormatada;
}

function abrirLoading() {
    document.querySelector('#loading').style.display = "flex"
}

function fecharLoading() {
    document.querySelector('#loading').style.display = "none"
}

function toast(mensagem, success) {
    document.querySelector('.toast-body').innerHTML = mensagem
    document.querySelector('.toast').style.backgroundColor = (success ? 'var(--primaria-700)' : 'var(--error)');
    modalToast.show()
}

function validarInputs(...inputs) {
    let temErro = false;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.classList.add('inputError');
            temErro = true;
        } else {
            input.classList.remove('inputError');
        }
    });

    return !temErro;
}

function desformataData(data) {
    const dataFormatada = moment(data).format('YYYY-MM-DD');;
    return dataFormatada;
}