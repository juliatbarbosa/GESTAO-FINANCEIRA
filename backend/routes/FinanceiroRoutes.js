const express = require("express");
const router = express.Router();

const financeiroController = require("../controller/CadastroFinanceiroController.js");

router.post("/financeiro", financeiroController.post);
router.put("/financeiro", financeiroController.put);
router.get("/financeiro", financeiroController.get);

module.exports = router;