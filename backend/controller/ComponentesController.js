const categoriaController = require("../controller/categoriaController.js");
const Tipo = require("../model/Tipo");
const logger = require("../logger/logger.js");

exports.getCategoria = async (req, res, next) => {
    try {
        logger.info("Requisição recebida para listar categorias (via ComponentesController).");
        return await categoriaController.get(req, res, next);
    } catch (error) {
        logger.error(`Erro ao buscar categorias via ComponentesController: ${error.message}`);
        return res.status(500).json({ error: "Erro ao buscar categorias" });
    }
};

exports.getTipo = async (req, res) => {
    try {
        const tipos = Object.values(Tipo);
        logger.info("Requisição recebida para listar tipos.");
        res.status(200).json(tipos);
    } catch (error) {
        logger.error(`Erro ao buscar tipos: ${error.message}`);
        res.status(500).json({ error: "Erro ao buscar tipos" });
    }
};