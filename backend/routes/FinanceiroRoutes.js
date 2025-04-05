const express = require("express");
const router = express.Router();

const financeiroController = require("../controller/CadastroFinanceiroController.js");

router.delete("/financeiro", financeiroController.delete);
router.post("/financeiro", financeiroController.post);
router.put("/financeiro", financeiroController.put);
router.get("/financeiro", financeiroController.get);
router.get("/financeiroeditar", financeiroController.getById);

module.exports = router;