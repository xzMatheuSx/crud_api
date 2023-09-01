const categoriaService = require('../service/categoriaService-JSON');
const categoriaController = require('express').Router();


categoriaController.get('/', async (request, response) => {
    categorias = await categoriaService.findAll();
    return response.json(categorias);
});

categoriaController.get('/:id', async (request, response) => {
    categoria = await categoriaService.find(request.params.id)
    if (!categoria) return response.status(404).send('O item do menu não foi encontrado');
    return response.json(categoria);
});

categoriaController.post('/', async (request, response) => {
    let { name, categoria, price, extras } = request.body;
    const newCategoria = await categoriaService.create(name, categoria, price, extras);

    if (!newCategoria) return response.status(401).send('Error')

    return response.json(newCategoria);

});

categoriaController.put('/:id', async (request, response) => {
    let { name, categoria, price, extras } = request.body;
    let { id } = request.params;
    const updateCategoria = await categoriaService.update(id, name, price, extras);

    if (!updateCategoria) return response.status(401).send('Error')
    return response.json(updateCategoria);
})

categoriaController.delete('/:id', async (request, response) => {
    const { id } = request.params;
    if (await categoriaService.destroy(id)) {
        return response.status(204).send('');
    } else {
        return response.status(404).send('Not Found');
    }
});


categoriaController.delete('/:id', async (request, response) => {
    const { id } = request.params;
    if (await categoriaService.destroy(id)) {
        return response.status(204).send('');
    } else {
        return response.status(404).send('Not Found');
    }
});

module.exports = categoriaController;

