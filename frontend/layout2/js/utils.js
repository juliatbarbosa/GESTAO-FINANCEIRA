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