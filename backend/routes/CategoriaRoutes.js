const usuarioController = require("./CategoriaController");

module.exports = (app) => {
    app.post("/categoria", usuarioController.post);
    app.put("/categoria/:id", usuarioController.put);
    app.get("/categoria", usuarioController.get);
}