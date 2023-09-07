const express = require('express');
const router = express.Router();
//const menuService = require('../service/categoriaService-JSON.js');
const menuService = require('../service/menuService-mysql.js');



router.get('/', async (request, response) => {
    const menus = await menuService.findAll();
    return response.json(menus);
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    const menu = await menuService.find(id)
    if (!menu) return response.status(404).send('O item do menu não foi encontrado');
    return response.json(menu);
});

router.post('/', async (request, response) => {
    let { name, menu, price, extras } = request.body;
    const newMenu = await menuService.create(name, menu, price, extras);

    if (!newMenu) return response.status(401).send('Error')

    return response.json(newMenu);
});

router.put('/:id', async (request, response) => {
    const { name, menu, price, extras } = request.body;
    const { id } = request.params;
    const updatedMenu = await menuService.update(id, name, menu, price, extras);

    if (!updatedMenu) return response.status(401).send('Error')

    return response.json(updatedMenu);
})

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    if (await menuService.destroy(id)) {
        return response.status(204).send('');
    } else {
        return response.status(404).send('Not Found');
    }
});

module.exports = router;
