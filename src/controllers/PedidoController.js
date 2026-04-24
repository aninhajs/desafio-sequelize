const Pedido = require("../models/Pedido");
const Produto = require("../models/Produto");

module.exports = {
  async criarPedido(req, res) {
    try {
      const { usuarioId, produtoId, quantidade } = req.body;
      console.log("Criar pedido - Recebido:", { usuarioId, produtoId, quantidade });

      // Verificar se o produto existe
      const produto = await Produto.findByPk(produtoId);
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      if (produto.estoque < quantidade) {
        return res
          .status(400)
          .json({ error: "Quantidade solicitada excede o estoque disponível" });
      }

      // 2. Criar o pedido
      const pedido = await Pedido.create({ usuarioId, produtoId, quantidade });

      // 3. Atualizar o estoque do produto
      await produto.update({ estoque: produto.estoque - quantidade });

      return res.status(201).json(pedido);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      return res.status(500).json({ error: "Erro ao criar o pedido" });
    }
  },

  async listarPedidos(req, res) {
    const pedidos = await Pedido.findAll({ include: [{ all: true }] });
    return res.status(200).json(pedidos);
  },

  async buscarPedidoPorId(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id, { include: [{ all: true }] });

      if (!pedido) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      return res.status(200).json(pedido);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar o pedido" });
    }
  },

  async atualizarPedido(req, res) {
    try {
      const { id } = req.params;
      const { quantidade } = req.body;

      const pedido = await Pedido.findByPk(id);
      if (!pedido) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      await pedido.update({ quantidade });
      return res.status(200).json(pedido);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar o pedido" });
    }
  },

  async deletarPedido(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);

      if (!pedido) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      await pedido.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar o pedido" });
    }
  },
};
