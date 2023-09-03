const express = require('express');
//const rotas = require('../src/controllers/menuController');
const app = express();

const rotas = [
  { rota: '/menu', controller: require('../controllers/menuController.js'),
    rota: '/categoria', controller: require('../controllers/categoriasController.js')
  },
];

rotas.forEach((item) => {
  app.use(item.rota, item.controller);
});

module.exports = rotas;
