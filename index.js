const express = require('express');
const categoriaController = require('./src/controllers/categoriaController');


const listenPort = 3001;
const app = express();
app.use(express.json());


app.get('/', (request, response) => {
    response.send('Hello Worldd!');
});

app.use('/categoria', categoriaController);

app.listen(listenPort, () => {
    console.log('listening on http://localhost:' + listenPort);
});
