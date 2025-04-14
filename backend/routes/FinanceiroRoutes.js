const express = require("express");
const router = express.Router();

const financeiroService = require("../service/CadastroFinanceiroService.js");

router.delete("/financeiro", financeiroService.delete);
router.post("/financeiro", financeiroService.post);
router.put("/financeiro", financeiroService.put);
router.get("/financeiro", financeiroService.get);
router.get("/financeiroeditar", financeiroService.getById);

module.exports = router;