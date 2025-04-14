const categoriaController = require("./CategoriaService.js");
const Tipo = require("../model/Tipo.js");
const logger = require("../logger/logger.js");
const Response = require("../model/Response.js");

exports.getCategoria = async (req, res, next) => {
    try {
        logger.info("Requisição recebida para listar categorias (via ComponentesController).");
        await categoriaController.get(req, res, next);
    } catch (error) {
        logger.error(`Erro ao buscar categorias via ComponentesController: ${error.message}`);
        res.status(500).json(new Response(false, "Erro interno ao buscar categorias"));
    }
};

exports.getTipo = async (req, res) => {
    try {
        const tipos = Object.values(Tipo);
        logger.info("Requisição recebida para listar tipos.");
        res.status(200).json(new Response(true, tipos));
    } catch (error) {
        logger.error(`Erro ao buscar tipos: ${error.message}`);
        res.status(500).json(new Response(false, "Erro interno ao buscar tipos"));
    }
};