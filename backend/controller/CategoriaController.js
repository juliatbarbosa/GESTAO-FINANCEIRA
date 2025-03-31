const logger = require("../logger");
const mysql = require("mysql2/promise");
const Categoria = require("../model/Categoria");

// Conexão com o banco
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

// Criar uma nova categoria
exports.post = async (req, res, next) => {
    try {
        const { descricao, cor, ativo } = req.body;

        if (!descricao || !cor || ativo === undefined) {
            logger.warning("Tentativa de inserção com valores inválidos.");
            return res.status(400).json({ error: "Descrição, cor e ativo são obrigatórios." });
        }

        // Criando objeto Categoria
        const categoria = new Categoria(null, descricao, cor, ativo);

        const conn = await connect();
        const sql = "INSERT INTO fn_categoria (descricao, cor, ativo) VALUES (?, ?, ?)";
        const values = [categoria.descricao, categoria.cor, categoria.ativo];

        await conn.query(sql, values);
        logger.info(`Categoria criada: ${JSON.stringify(categoria)}`);

        res.status(201).send("OK");
    } catch (error) {
        logger.error(`Erro ao inserir categoria: ${error.message}`);
        res.status(500).json({ error: "Erro interno ao inserir categoria" });
    }
};

// Atualizar uma categoria existente
exports.put = async (req, res, next) => {
    try {
        const { descricao, cor, ativo } = req.body;
        const { id } = req.params;

        if (!id || !descricao || !cor || ativo === undefined) {
            logger.warning("Tentativa de atualização com valores inválidos.");
            return res.status(400).json({ error: "ID, descrição, cor e ativo são obrigatórios." });
        }

        // Criando objeto Categoria
        const categoria = new Categoria(id, descricao, cor, ativo);

        const conn = await connect();
        const sql = "UPDATE fn_categoria SET descricao = ?, cor = ?, ativo = ? WHERE idcategoria = ?";
        const values = [categoria.descricao, categoria.cor, categoria.ativo, categoria.idcategoria];

        await conn.query(sql, values);
        logger.info(`Categoria atualizada: ${JSON.stringify(categoria)}`);

        res.status(200).send("OK");
    } catch (error) {
        logger.error(`Erro ao atualizar categoria ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: "Erro interno ao atualizar categoria" });
    }
};

// Buscar todas as categorias
exports.get = async (req, res, next) => {
    try {
        const conn = await connect();
        const [rows] = await conn.query("SELECT * FROM fn_categoria");

        const categorias = rows.map(row => new Categoria(row.idcategoria, row.descricao, row.cor, row.ativo));

        logger.info(`Consulta realizada: ${categorias.length} categorias encontradas.`);
        res.status(200).json(categorias);
    } catch (error) {
        logger.error(`Erro ao buscar categorias: ${error.message}`);
        res.status(500).json({ error: "Erro interno ao buscar categorias" });
    }
};
