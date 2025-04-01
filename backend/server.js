const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("./logger/logger");

const app = express();

app.use(cors());
app.use(express.json());

// Middleware para registrar requisições
app.use((req, res, next) => {
    logger.info(`Requisição: ${req.method} ${req.url}`);
    next();
});

// Importa as rotas
const categoriaRoutes = require("./routes/CategoriaRoutes");
const financeiroRoutes = require("./routes/FinanceiroRoutes");

app.use("/categorias", categoriaRoutes);
app.use("/financeiro", financeiroRoutes);

// Servir arquivos estáticos do frontend
// app.use(express.static(path.join(__dirname, "..", "frontend/layout2/pages")));

app.use(express.static(path.join(__dirname, "frontend")));

// Tratamento de erro global
app.use((err, req, res, next) => {
    logger.error(`Erro no servidor: ${err.message}`);
    res.status(500).json({ error: "Erro interno no servidor" });
});

// Iniciar o servidor
const PORT = 3333;
app.listen(PORT, () => {
    logger.info(`Servidor rodando em http://localhost:${PORT}`);
});
