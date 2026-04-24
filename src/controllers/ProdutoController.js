const Produto = require("../models/Produto");

module.exports = {
  //  Criar Produto (POST)
  async criarProduto(req, res) {
    try {
      const { nome, preco, estoque } = req.body;
      console.log("Recebido:", { nome, preco, estoque });
      const produto = await Produto.create({ nome, preco, estoque });
      return res.status(201).json(produto);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      return res.status(500).json({ error: "Erro ao criar o produto" });
    }
  },

  //  Listar todos (GET)
  async listarProdutos(req, res) {
    try {
      const produtos = await Produto.findAll();
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar os produtos" });
    }
  },

  //   Buscar por ID (GET)
  async buscarProdutoPorId(req, res) {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar o produto" });
    }
  },

  //   Atualizar (PUT)
  async atualizarProduto(req, res) {
    try {
      const { id } = req.params;
      const { nome, preco, estoque } = req.body;
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      await produto.update({ nome, preco, estoque });
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar o produto" });
    }
  },

  //   Deletar (DELETE)
  async deletarProduto(req, res) {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      await produto.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar o produto" });
    }
  },
};
