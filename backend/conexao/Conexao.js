const mysql = require("mysql2/promise");
const logger = require("../logger/logger"); 

class Conexao {
    constructor() {
        if (!Conexao.instance) {
            this.initConnection();
            Conexao.instance = this;
        }
        return Conexao.instance;
    }

    async initConnection() {
        try {
            this.connection = await mysql.createConnection({
                host: '54.91.193.137',
                user: 'libertas',
                password: '123456',
                database: 'libertas5per'
            });

            logger.info("Conexão com o banco de dados estabelecida.");
        } catch (error) {
            logger.error(`Erro ao conectar no banco de dados: ${error.message}`);
        }
    }

    async getConnection() {
        if (!this.connection || this.connection.connection._closing) {
            logger.warning("Conexão encerrada detectada, tentando reconectar...");
            await this.initConnection();
        }
        return this.connection;
    }
}
module.exports = new Conexao();