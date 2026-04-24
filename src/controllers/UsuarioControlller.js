const Usuario = require("../models/Usuarios");

module.exports = {
  async criarUsuario(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const usuario = await Usuario.create({ nome, email, senha });
      res.status(201).json(usuario);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  },

  // Listar todos (GET)

  async listarUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  },

  // Buscar por ID (GET)
  async buscarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      res.status(500).json({ error: "Erro ao buscar usuário por ID" });
    }
  },

  // Atualizar (PUT)
  async atualizarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        res.status(404).json({ error: "Usuário não encontrado" });
      } else {
        await usuario.update({ nome, email, senha });
        res.status(200).json(usuario);
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  },

  // Deletar (DELETE)
  async deletarUsuario(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        res.status(404).json({ error: "Usuário não encontrado" });
      } else {
        await usuario.destroy();
        res.status(204).send();
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  },
};
