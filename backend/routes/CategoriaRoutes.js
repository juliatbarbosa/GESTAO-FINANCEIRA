const categoriaRoutes = require("./CategoriaController");

module.exports = (app) => {
    app.post("/categoria", categoriaRoutes.post);
    app.put("/categoria/:id", categoriaRoutes.put);
    app.get("/categoria", categoriaRoutes.get);
}