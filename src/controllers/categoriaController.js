const express = require('express');
const router = express.Router();
const categoriaService = require('../service/categoriaService-JSON');

router.get('/', async (request, response) => {
    const categorias = await categoriaService.findAll();
    return response.json(categorias);
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    const categoria = await categoriaService.find(id)
    if (!categoria) return response.status(404).send('O item do menu não foi encontrado');
    return response.json(categoria);
});

router.post('/', async (request, response) => {
    let { name, menu, price, extras } = request.body;
    const newCategoria = await categoriaService.create(name, menu, price, extras);

    if (!newCategoria) return response.status(401).send('Error')

    return response.json(newCategoria);
});

router.put('/:id', async (request, response) => {
    const { name, menu, price, extras } = request.body;
    const { id } = request.params;
    const updatedCategoria = await categoriaService.update(id, name, menu, price, extras);

    if (!updatedCategoria) return response.status(401).send('Error')

    return response.json(updatedCategoria);
})

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    if (await categoriaService.destroy(id)) {
        return response.status(204).send('');
    } else {
        return response.status(404).send('Not Found');
    }
});

module.exports = router;
