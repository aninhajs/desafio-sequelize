const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioControlller");

// Rotas de Usuário - CRUD Completo
router.post("/", UsuarioController.criarUsuario);
router.get("/", UsuarioController.listarUsuarios);
router.get("/:id", UsuarioController.buscarUsuarioPorId);
router.put("/:id", UsuarioController.atualizarUsuario);
router.delete("/:id", UsuarioController.deletarUsuario);

module.exports = router;
