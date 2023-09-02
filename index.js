const express = require('express');
const rotas = require('./controllers/categoriaController'); 
const listenPort = 3001;
const app = express();
app.use(express.json());


app.get('/', (request, response) => {
    response.send('Hello WorlD!');
});
app.use('/categoria', rotas);

app.listen(listenPort, () => {
    console.log('listening on http://localhost:' + listenPort);
});
