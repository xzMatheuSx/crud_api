const categoriaService = require('./productsService-mysql');
const categoriaController = require('express').Router();


categoriaController.get('/', async (request, response) => {
    products = await categoriaService.findAll();
    return response.json(products);
});

categoriaController.get('/:id', async (request, response) => {
    categoria = await categoriaService.find(request.params.id)
    if (!categoria) return response.status(404).send('Cardapio não encontrado');
    return response.json(categoria);
});

categoriaController.post('/', async (request, response) => {
    let {tipoProdt,name, price} = request.body;
    categoria = await categoriaService.create(tipoProdt, name, price, );

    if (!categoria) return response.status(401).send('Error')

    return response.json(categoria);

});


