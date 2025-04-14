const express = require("express");
const router = express.Router();

const categoriaService = require("../service/CategoriaService.js");

router.post("/categoria", categoriaService.post);
router.put("/categoria", categoriaService.put);
router.get("/categoria", categoriaService.get);

module.exports = router;