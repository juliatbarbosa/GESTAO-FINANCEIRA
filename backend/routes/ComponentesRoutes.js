const express = require("express");
const router = express.Router();

const componentesService = require("../service/ComponentesService.js");

router.get("/categoria", componentesService.getCategoria);
router.get("/tipo", componentesService.getTipo);

module.exports = router;