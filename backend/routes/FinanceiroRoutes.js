const financeiroRoutes = require("../routes/FinanceiroRoutes");

module.exports = (app) => {
    app.post("/financeiro", financeiroRoutes.post);
    app.put("/financeiro/:id", financeiroRoutes.put);
    app.get("/financeiro", financeiroRoutes.get);
}