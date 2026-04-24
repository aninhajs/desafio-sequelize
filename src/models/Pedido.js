const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuarios");
const Produto = require("./Produto");

const Pedido = sequelize.define("Pedido", {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Pedido.belongsTo(Usuario, { foreignKey: "usuarioId" });
Pedido.belongsTo(Produto, { foreignKey: "produtoId" });

module.exports = Pedido;
