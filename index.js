const express = require('express');
const categoriaController = require('./categoria/categoriaController');

const listenPort = 3001;
const app = express();
app.use(express.json());


app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.use('/categoria', categoriaController);

app.listen(listenPort, () => { 
    console.log('listening on http://localhost:' + listenPort); 
});
