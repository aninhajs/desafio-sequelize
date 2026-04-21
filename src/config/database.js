const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, // No Docker será 'localhost'
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // Para não poluir o terminal com comandos SQL
  },
);

module.exports = sequelize;
