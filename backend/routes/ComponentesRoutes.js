const express = require("express");
const router = express.Router();

const componentesController = require("../controller/ComponentesController.js");

router.get("/categoria", componentesController.getCategoria);
router.get("/tipo", componentesController.getTipo);

module.exports = router;