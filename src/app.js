const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const app = express();
const sequelize = require("./config/database");
const usuarioRoutes = require("./routes/usuarioRoutes");

// Essencial para o Express entender JSON no corpo da requisição
app.use(express.json());

// Usando as rotas de usuário
app.use("/api", usuarioRoutes);

const PORT = process.env.PORT || 3000;

// Sincroniza o banco e sobe o servidor
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => console.error(" Erro ao conectar ao banco:", err));
