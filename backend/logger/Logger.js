const fs = require("fs");
const path = require("path");

class Logger {
    static instancia = null;
    logs = [];
    static ARQUIVO_LOG = path.join(__dirname, "logs.txt");

    constructor() {
        if (Logger.instancia) {
            return Logger.instancia;
        }

        this.criaArquivoSeNaoExiste();
        Logger.instancia = this;
    }

    log(message, level) {
        const entrada = `[${new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}] [${level}] ${message}`;

        this.logs.push(entrada);
        console.log(entrada);
        this.registraLog(entrada);
    }

    info(message) {
        this.log(message, "INFO");
    }

    warning(message) {
        this.log(message, "WARNING");
    }

    error(message) {
        this.log(message, "ERROR");
    }

    criaArquivoSeNaoExiste() {
        if (!fs.existsSync(Logger.ARQUIVO_LOG)) {
            fs.writeFileSync(Logger.ARQUIVO_LOG, "", { flag: "wx" });
            console.log("Arquivo de log criado: " + Logger.ARQUIVO_LOG);
        }
    }

    registraLog(entrada) {
        fs.appendFile(Logger.ARQUIVO_LOG, entrada + "\n", (err) => {
            if (err) {
                console.error("Erro ao escrever no arquivo de log:", err);
            }
        });
    }

    getLogs() {
        return this.logs;
    }
}
module.exports = new Logger();
