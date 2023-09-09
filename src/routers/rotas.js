const express = require('express');
const app = express();

const rotas = [
  { rota: '/menu', controller: require('../controllers/menuController.js'),
    rota: '/categoria', controller: require('../controllers/categoriasController.js'),
    rota: '/pedido', controller: require('../controllers/pedidosController.js')
  },
];

rotas.forEach((item) => {
  app.use(item.rota, item.controller);
});

module.exports = rotas;
