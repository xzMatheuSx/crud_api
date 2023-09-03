//import {rotass} from './src/routers/rotas';
const express = require('express');

const categoriaRouter = require('./src/controllers/categoriasController',);
const rotas = require('./src/controllers/menuController');
const listenPort = 3001;
const app = express();
app.use(express.json());


app.get('/', (request, response) => {
    response.send('Hello WorlD!');
});

app.use('/categoria', categoriaRouter);
app.use('/menu', rotas);

app.listen(listenPort, () => {
    console.log('listening on http://localhost:' + listenPort);
});
