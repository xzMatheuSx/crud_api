const express = require('express');
const pedidos = express.Router();
const pedidosService = require('../service/pedidosService-mysql');

pedidos.get('/', async(request, response) =>{
    const pedido = await pedidosService.findAll();
    return response.json(pedido);
});

pedidos.get('/:id', async(request, response) =>{
    const {id} = request.params;
    const pedido = await pedidosService.find(id)
    if (!pedido) return response.status(404).send('O pedido do cliente não foi encontrado');
    return response.json(pedido);
});

pedidos.post('/', async(request, response) =>{
    let {numero_do_pedido,cliente,valor_total_do_pedido } = request.body;
    const newPedido = await pedidosService.create({numero_do_pedido,cliente,valor_total_do_pedido});
    
    if(!newPedido) return response.status(401).send('Errr')

    return response.json(newPedido);
})

pedidos.put('/:id', async (request, response) =>{
    const {numero_do_pedido,cliente,valor_total_do_pedido} = request.body;
    const {id} = request.params;
    const updatePedido = await pedidosService.update(id, numero_do_pedido, cliente, valor_total_do_pedido);

    if(!updatePedido) return response.status(401).send('Error')
    return response.json(updatePedido);
});

pedidos.delete('/:id', async (request, response) => {
    const { id } = request.params;
    if (await pedidosService.destroy(id)) {
        return response.status(204).send('');
    } else {
        return response.status(404).send('Not Found');
    }
});


module.exports = pedidos;