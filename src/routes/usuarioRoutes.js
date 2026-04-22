const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioControlller");

// Rotas de Usuário
router.post("/usuarios", UsuarioController.criarUsuario);
router.get("/usuarios", UsuarioController.listarUsuarios);
router.get("/usuarios/:id", UsuarioController.buscarUsuarioPorId);

module.exports = router;
