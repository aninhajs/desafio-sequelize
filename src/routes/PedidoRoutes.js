const express = require("express");
const router = express.Router();
const PedidoController = require("../controllers/PedidoController");

// Rotas para pedidos
router.post("/", PedidoController.criarPedido);
router.get("/", PedidoController.listarPedidos);
router.get("/:id", PedidoController.buscarPedidoPorId);
router.put("/:id", PedidoController.atualizarPedido);
router.delete("/:id", PedidoController.deletarPedido);

module.exports = router;
