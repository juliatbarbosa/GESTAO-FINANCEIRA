const express = require("express");
const router = express.Router();

const categoriaController = require("../controller/categoriaController.js");

router.post("/categoria", categoriaController.post);
router.put("/categoria", categoriaController.put);
router.get("/categoria", categoriaController.get);

module.exports = router;