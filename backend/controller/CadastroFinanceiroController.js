const logger = require("../logger/logger");
const Financeiro = require("../model/Financeiro");
const connect = require("../conexao/Conexao");

exports.post = async (req, res, next) => {
    try {
        const { descricao, data, idcategoria, tipo, valor } = req.body;

        if (!descricao || !data || !idcategoria || !tipo || valor === undefined) {
            logger.warning("Tentativa de inserção com valores inválidos.");
            return res.status(400).json({ error: "Descrição, data, idcategoria, tipo e valor são obrigatórios." });
        }

        const financeiro = new Financeiro(null, descricao, data, idcategoria, tipo, valor);

        const conn = await connect.getConnection();
        const sql = "INSERT INTO fn_financeiro (descricao, data, idcategoria, tipo, valor) VALUES (?, ?, ?, ?, ?)";
        const values = [financeiro.descricao, financeiro.data, financeiro.idcategoria, financeiro.tipo, financeiro.valor];
        await conn.query(sql, values);
        logger.info(`financeiro criada: ${JSON.stringify(financeiro)}`);

        res.status(201).send("OK");
    } catch (error) {
        logger.error(`Erro ao inserir financeiro: ${error.message}`);
        res.status(500).json({ error: "Erro interno ao inserir financeiro" });
    } finally {
        if (conn) conn.end();
    }
};

exports.put = async (req, res, next) => {
    try {
        const { idfinanceiro, descricao, data, idcategoria, tipo, valor } = req.body;

        if (!idfinanceiro || !descricao || !data || !idcategoria || !tipo || valor === undefined) {
            logger.warning("Tentativa de atualização com valores inválidos.");
            return res.status(400).json({ error: "idfinanceiro, descrição, data, idcategoria, tipo e valor são obrigatórios." });
        }

        const financeiro = new Financeiro(idfinanceiro, descricao, data, idfinanceiro, tipo, valor, new Date());

        const conn = await connect.getConnection();
        const sql = "UPDATE fn_financeiro SET descricao = ?, data = ?, idcategoria = ?, tipo = ?, valor = ?, dataalteracao = ? WHERE idfinanceiro = ?";
        const values = [financeiro.descricao, financeiro.data, financeiro.idcategoria, financeiro.tipo, financeiro.valor, financeiro.dataalteracao, financeiro.idfinanceiro];

        await conn.query(sql, values);
        logger.info(`financeiro atualizada: ${JSON.stringify(financeiro)}`);

        res.status(200).send("OK");
    } catch (error) {
        logger.error(`Erro ao atualizar financeiro ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: "Erro interno ao atualizar financeiro" });
    } finally {
        if (conn) conn.end();
    }
};

exports.getById = async (req, res, next) => {
    try {
        const {
            idfinanceiro
        } = req.query;

        let sql = "SELECT * FROM fn_financeiro WHERE 1=1";
        const params = [];

        if (idfinanceiro) {
            sql += " AND idfinanceiro = ?";
            params.push(idfinanceiro);
        } else {
            logger.error(`Erro interno, idfinanceiro obrigatório`);
            res.status(404).json({ error: "Erro interno, idfinanceiro obrigatório" });
        }

        conn = await connect.getConnection();
        const [rows] = await conn.query(sql, params);

        const financeiro = rows.map(row =>
            new Financeiro(
                row.idfinanceiro,
                row.descricao,
                row.data,
                row.idcategoria,
                row.tipo,
                row.valor,
                row.dataalteracao
            )
        );

        logger.info(`Consulta realizada: ${financeiro.length} registros encontrados.`);
        res.status(200).json(financeiro);
    } catch (error) {
        logger.error(`Erro ao buscar registros: ${error.message}`);
        res.status(500).json({ error: "Erro interno ao buscar registros" });
    } finally {
        if (conn) conn.end();
    }
};

exports.get = async (req, res, next) => {
    try {
        const {
            descricao,
            datainicio,
            datafinal,
            tipo,
            idcategoria
        } = req.query;

        const params = [];

        let filtros = "";
        if (descricao) {
            filtros += " AND ff.descricao LIKE ?";
            params.push(`%${descricao}%`);
        }

        if (datainicio) {
            filtros += " AND ff.data >= ?";
            params.push(datainicio);
        }

        if (datafinal) {
            filtros += " AND ff.data <= ?";
            params.push(datafinal);
        }

        if (tipo) {
            filtros += " AND ff.tipo = ?";
            params.push(tipo);
        }

        if (idcategoria) {
            filtros += " AND ff.idcategoria = ?";
            params.push(idcategoria);
        }

        let sql = `WITH tab AS (
            SELECT ff.\`data\`, ff.dataalteracao, ff.descricao AS desc_financeiro, ff.idcategoria,
                ff.idfinanceiro, ff.tipo, ff.valor, fc.descricao AS desc_categoria, fc.cor
            FROM fn_financeiro ff 
            INNER JOIN fn_categoria fc ON fc.idcategoria = ff.idcategoria
            WHERE 1=1 ` + filtros + `
            ORDER BY ff.data DESC
        )
        , tab_total AS (
            SELECT 
                SUM(CASE WHEN tipo = 'ENTRADA' THEN valor ELSE 0 END) AS total_entrada,
                SUM(CASE WHEN tipo = 'SAIDA' THEN valor ELSE 0 END) AS total_saida,
                SUM(valor) AS total_geral
            FROM tab
        )
        SELECT JSON_OBJECT(
            'dados', JSON_ARRAYAGG(JSON_OBJECT(
                'data', tab.\`data\`,
                'dataalteracao', tab.dataalteracao,
                'desc_financeiro', tab.desc_financeiro,
                'idcategoria', tab.idcategoria,
                'idfinanceiro', tab.idfinanceiro,
                'tipo', tab.tipo,
                'valor', tab.valor,
                'desc_categoria', tab.desc_categoria,
                'cor_categoria', tab.cor
            )),
            'total_entrada', tab_total.total_entrada,
            'total_saida', tab_total.total_saida,
            'total_geral', tab_total.total_geral
        ) AS message
        FROM tab
        JOIN tab_total ON TRUE;`;

        conn = await connect.getConnection();
        const [rows] = await conn.query(sql, params);

        logger.info(`Consulta realizada: ${rows.length} registros encontrados.`);
        res.status(200).json(JSON.parse(rows[0].message));
    } catch (error) {
        logger.error(`Erro ao buscar registros: ${error.message}`);
        res.status(500).json({ error: "Erro interno ao buscar registros" });
    } finally {
        if (conn) conn.end();
    }
};