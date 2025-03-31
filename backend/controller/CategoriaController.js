const logger = require("./logger");
const mysql = require("mysql2/promise");

async function connect() {
    if (global.connection && global.connection.state !== "disconnect") {
        return global.connection;
    }

    const connection = await mysql.createConnection({
        host: '54.91.193.137',
        user: 'libertas',
        password: '123456',
        database: 'libertas5per'
    });

    global.connection = connection;
    return connection;
}

exports.post = async (req, res, next) => {
    try {
        const conn = await connect();
        const sql = "INSERT INTO fn_categoria (descricao, cor, ativo) VALUES (?, ?, ?)";
        const values = [req.body.descricao, req.body.cor, req.body.ativo];

        if (!req.body.descricao || !req.body.cor || !req.body.ativo) {
            logger.warning("Tentativa de inserção com valores vazios.");
            return res.status(400).json({ error: "Descrição e cor são obrigatórios." });
        }

        await conn.query(sql, values);
        logger.info(`Categoria criada: Descrição='${req.body.descricao}', Cor='${req.body.cor}'`);

        res.status(201).send("OK");
    } catch (error) {
        logger.error(`Erro ao inserir categoria: ${error.message}`);
        res.status(500).json({ error: "Erro interno ao inserir categoria" });
    }
};

exports.put = async (req, res, next) => {
    try {
        const conn = await connect();
        const sql = "UPDATE fn_categoria SET descricao = ?, cor = ?, ativo = ? WHERE idcategoria = ?";
        const values = [req.body.descricao, req.body.cor, req.body.ativo, req.params.id];

        if (!req.body.descricao || !req.body.cor || !req.params.id) {
            logger.warning("Tentativa de atualização com valores inválidos.");
            return res.status(400).json({ error: "ID, descrição e cor são obrigatórios." });
        }

        await conn.query(sql, values);
        logger.info(`Categoria ${req.params.id} atualizada: Descrição='${req.body.descricao}', Cor='${req.body.cor}'`);

        res.status(201).send("OK");
    } catch (error) {
        logger.error(`Erro ao atualizar categoria ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: "Erro interno ao atualizar categoria" });
    }
};

exports.get = async (req, res, next) => {
    try {
        const conn = await connect();
        const [rows] = await conn.query("SELECT * FROM fn_categoria");

        logger.info(`Consulta realizada: ${rows.length} categorias encontradas.`);
        res.status(200).send(rows);
    } catch (error) {
        logger.error(`Erro ao buscar categorias: ${error.message}`);
        res.status(500).json({ error: "Erro interno ao buscar categorias" });
    }
};
