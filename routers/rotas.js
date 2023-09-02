const express = require('express');

const app = express();

const rotas = [
  { rota: '/categoria', controller: require('../controllers/categoriaController.js') },
];

rotas.forEach((item) => {
  app.use(item.rota, item.controller);
});

module.exports = app;
