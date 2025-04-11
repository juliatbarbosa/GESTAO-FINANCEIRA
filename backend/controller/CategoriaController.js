const logger = require("../logger/logger");
const Categoria = require("../model/Categoria");
const connect = require("../conexao/Conexao"); 
const Response = require("../model/Response");
let conn;

exports.post = async (req, res, next) => {
    try {
        const { descricao, cor, ativo } = req.body;

        if (!descricao || !cor || ativo === undefined) {
            logger.warning("Tentativa de inserção com valores inválidos.");
            return res.status(400).json(new Response(false, "Descrição, cor e ativo são obrigatórios."));
        }

        const categoria = new Categoria(null, descricao, cor, ativo);

        conn = await connect.getConnection();
        const sql = "INSERT INTO fn_categoria (descricao, cor, ativo) VALUES (?, ?, ?)";
        const values = [categoria.descricao, categoria.cor, categoria.ativo];

        await conn.query(sql, values);
        logger.info(`Categoria criada: ${JSON.stringify(categoria)}`);

        return res.status(201).send(new Response(true, "ok"));
    } catch (error) {
        logger.error(`Erro ao inserir categoria: ${error.message}`);
        return res.status(500).json(new Response(false, "Erro interno ao inserir categoria"));
    }finally {
        if (conn) conn.end(); 
    }
};

exports.put = async (req, res, next) => {
    try {
        const {idcategoria, descricao, cor, ativo } = req.body;

        if (!idcategoria || !descricao || !cor || ativo === undefined) {
            logger.warning("Tentativa de atualização com valores inválidos.");
            return res.status(400).json(new Response(false, "idcategoria, descrição, cor e ativo são obrigatórios."));
        }

        const categoria = new Categoria(idcategoria, descricao, cor, ativo);

        conn = await connect.getConnection();
        const sql = "UPDATE fn_categoria SET descricao = ?, cor = ?, ativo = ? WHERE idcategoria = ?";
        const values = [categoria.descricao, categoria.cor, categoria.ativo, (categoria.idcategoria === "true" ? 1 : 0)];

        await conn.query(sql, values);
        logger.info(`Categoria atualizada: ${JSON.stringify(categoria)}`);

        return res.status(200).send(new Response(true, "ok"));
    } catch (error) {
        logger.error(`Erro ao atualizar categoria ${req.params.id}: ${error.message}`);
        return res.status(500).json(new Response(false, "Erro interno ao atualizar categoria"));
    }finally {
        if (conn) conn.end(); 
    }
};

exports.get = async (req, res, next) => {
    let conn;
    try {
        conn = await connect.getConnection();

        const { ativo, descricao, idcategoria } = req.query;
        let sql = "SELECT * FROM fn_categoria WHERE 1=1";
        const params = [];

        if (idcategoria) {
            sql += " AND idcategoria = ?";
            params.push(idcategoria);
        }

        if (ativo) {
            sql += " AND ativo = ?";
            params.push(ativo === "true" || ativo === "1" ? 1 : 0);
        }

        if (descricao) {
            sql += " AND descricao LIKE ?";
            params.push(`%${descricao}%`);
        }

        const [rows] = await conn.query(sql, params);

        const categorias = rows.map(row =>
            new Categoria(row.idcategoria, row.descricao, row.cor, row.ativo)
        );

        logger.info(`Consulta realizada: ${categorias.length} categorias encontradas.`);
        return res.status(200).json(new Response(true, categorias.length == 1 ? categorias[0] : categorias));
    } catch (error) {   
        logger.error(`Erro ao buscar categorias: ${error.message}`);
        return res.status(500).json(new Response(false, "Erro interno ao buscar categorias"));
    } finally {
        if (conn) conn.end();
    }
};

