const logger = require("../logger/logger");
const Financeiro = require("../model/Financeiro");
const connect = require("../conexao/Conexao");
const Response = require("../model/Response");

let conn;

exports.delete = async (req, res, next) => {
    try {
        const { idfinanceiro } = req.body;
        if (!idfinanceiro) {
            logger.warning("Tentativa de exclusão com valores inválidos.");
            return res.status(400).json(new Response(false, "idfinanceiro é obrigatório."));
        }

        conn = await connect.getConnection();
        const sql = "DELETE FROM fn_financeiro WHERE idfinanceiro = ?";
        const values = [idfinanceiro];
        await conn.query(sql, values);
        logger.info(`Registro financeiro excluído: ${idfinanceiro}`);
        return res.status(200).json(new Response(true, "ok"));
    } catch (error) {
        logger.error(`Erro ao excluir financeiro: ${error.message}`);
        return res.status(500).json(new Response(false, "Erro interno ao excluir financeiro"));
    } finally {
        if (conn) conn.end();
    }
};

exports.post = async (req, res, next) => {
    try {
        const { descricao, data, idcategoria, tipo, valor } = req.body;

        if (!descricao || !data || !idcategoria || !tipo || !valor) {
            logger.warning("Tentativa de inserção com valores inválidos.");
            return res.status(400).json(new Response(false, "Descrição, data, idcategoria, tipo e valor são obrigatórios."));
        }

        const financeiro = new Financeiro(null, descricao, data, idcategoria, tipo, valor);

        conn = await connect.getConnection();
        const sql = "INSERT INTO fn_financeiro (descricao, data, idcategoria, tipo, valor) VALUES (?, ?, ?, ?, ?)";
        const values = [financeiro.descricao, financeiro.data, financeiro.idcategoria, financeiro.tipo, financeiro.valor];
        await conn.query(sql, values);
        logger.info(sql, values);
        logger.info(`Registro financeiro criado: ${JSON.stringify(financeiro)}`);
        return res.status(200).json(new Response(true, "ok"));
    } catch (error) {
        logger.error(`Erro ao inserir financeiro: ${error.message}`);
        return res.status(500).json(new Response(false, "Erro interno ao inserir transação"));
    } finally {
        if (conn) conn.end();
    }
};

exports.put = async (req, res, next) => {
    try {
        const { idfinanceiro, descricao, data, idcategoria, tipo, valor } = req.body;

        if (!idfinanceiro || !descricao || !data || !idcategoria || !tipo || valor === undefined) {
            logger.warning("Tentativa de atualização com valores inválidos.");
            return res.status(400).json(new Response(false, "idfinanceiro, descrição, data, idcategoria, tipo e valor são obrigatórios."));
        }

        const financeiro = new Financeiro(idfinanceiro, descricao, data, idcategoria, tipo, valor, new Date());

        conn = await connect.getConnection();
        const sql = "UPDATE fn_financeiro SET descricao = ?, data = ?, idcategoria = ?, tipo = ?, valor = ?, dataalteracao = ? WHERE idfinanceiro = ?";
        const values = [financeiro.descricao, financeiro.data, financeiro.idcategoria, financeiro.tipo, financeiro.valor, financeiro.dataalteracao, financeiro.idfinanceiro];

        await conn.query(sql, values);
        logger.info(`Registro financeiro atualizado: ${JSON.stringify(financeiro)}`);

        return res.status(200).json(new Response(true, "ok"));
    } catch (error) {
        logger.error(`Erro ao atualizar financeiro ${req.params.id}: ${error.message}`);
        return res.status(500).json(new Response(false, "Erro interno ao atualizar transação"));
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
            return res.status(404).json(new Response(false, "idfinanceiro obrigatório"));
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
                parseFloat(row.valor),
                row.dataalteracao
            )
        );

        logger.info(`Consulta realizada: ${financeiro.length} registros encontrados.`);
        return res.status(200).json(new Response(true, financeiro));
    } catch (error) {
        logger.error(`Erro ao buscar registros: ${error.message}`);
        return res.status(500).json(new Response(false, "Erro interno ao buscar registros"));
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

        const sql = `
            WITH tab AS (
                SELECT ff.\`data\`, ff.dataalteracao, ff.descricao AS desc_financeiro, ff.idcategoria,
                ff.idfinanceiro, ff.tipo, ff.valor, fc.descricao AS desc_categoria, fc.cor
                FROM fn_financeiro ff 
                INNER JOIN fn_categoria fc ON fc.idcategoria = ff.idcategoria
                WHERE 1=1 ${filtros}
            ),
            tab_total AS (
                SELECT SUM(CASE WHEN tipo = 'ENTRADA' THEN valor ELSE 0 END) AS total_entrada,
                SUM(CASE WHEN tipo = 'SAIDA' THEN valor ELSE 0 END) AS total_saida
                FROM tab
            )
            SELECT 
                tab.*, 
                tab_total.total_entrada, 
                tab_total.total_saida, 
                (tab_total.total_entrada - tab_total.total_saida) AS total_geral
            FROM tab
            JOIN tab_total ON TRUE
            ORDER BY tab.data DESC;`;

        conn = await connect.getConnection();
        const [rows] = await conn.query(sql, params);

        if (rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: [],
                total_entrada: 0,
                total_saida: 0,
                total_geral: 0
            });
        }

        const { total_entrada, total_saida, total_geral } = rows[0];

        const message = rows.map(({ total_entrada, total_saida, total_geral, ...rest }) => ({
            ...rest,
            valor: parseFloat(rest.valor)
        }));

        logger.info(`Consulta realizada: ${message.length} registros encontrados.`);
        return res.status(200).json({
            success: true,
            message,
            total_entrada: parseFloat(total_entrada),
            total_saida: parseFloat(total_saida),
            total_geral: parseFloat(total_geral)
        });

    } catch (error) {
        logger.error(`Erro ao buscar registros: ${error.message}`);
        return res.status(500).json(new Response(false, "Erro interno ao buscar registros"));
    } finally {
        if (conn) conn.end();
    }
};
