const express = require('express');
const router = express.Router();
const categoriaService = require('../service/categoriaService-JSON.js');


router.get('/', (request, response) => {
    response.send('categoriaaaaaaaa!');
})

 router.get('/categorias', async (request, response) => {
    const categorias = await categoriaService.findAll();
    return response.json(categorias);
 });


router.get('/:id', async (request, response) => {
    const { id } = request.params;
    const categoria = await categoriaService.find(id)
    if (!categoria) return response.status(404).send('Categoria não encontrada');
    return response.json(categoria);
});

router.post('/post', async (request, response) => {
    let { name } = request.body;
    const newCategoria = await categoriaService.create(name);

    if (!newCategoria) return response.status(401).send('Erro ao criar a categoria')

    return response.json(newCategoria);
});

router.put('/categorias/:id', async (request, response) => {
    const { name } = request.body;
    const { id } = request.params;
    const updatedCategoria = await categoriaService.update(id, name);

    if (!updatedCategoria) return response.status(401).send('Erro ao atualizar a categoria')

    return response.json(updatedCategoria);
})

router.delete('/categorias/:id', async (request, response) => {
    const { id } = request.params;
    if (await categoriaService.destroy(id)) {
        return response.status(204).send('');
    } else {
        return response.status(404).send('Categoria não encontrada');
    }
});

module.exports = router;
