const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const app = express();
const sequelize = require("./config/database");
const Usuario = require("./models/Usuarios");
const Produto = require("./models/Produto");
const Pedido = require("./models/Pedido");

const produtoRoutes = require("./routes/ProdutoRoutes");
const pedidoRoutes = require("./routes/PedidoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

// Essencial para o Express entender JSON no corpo da requisição
app.use(express.json());

// Usando as rotas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/pedidos", pedidoRoutes);

const PORT = process.env.PORT || 3000;

console.log("Tentando sincronizar o banco...");

// Sincroniza os models e sobe o servidor
Promise.all([
  Usuario.sync(), 
  Produto.sync({ alter: true }), // Atualiza a tabela com a nova coluna estoque
  Pedido.sync()
])
  .then(() => {
    console.log("Banco sincronizado com sucesso!");
    const server = app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

    server.on("error", (err) => {
      console.error("Erro no servidor:", err);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco:", err);
    process.exit(1);
  });
