const connection = require('./db-mysql');

const findAll = async () => {
    let db = await connection();
    let [rows] = await db.query("SELECT * FROM menu.pedidos;");
    return rows;
}

const find = async (id) => {
    let db = await connection();
    let [menu] = await db.query("SELECT * FROM pedidos WHERE id = ?", id);

    return (menu[0] ?? null);
}

const create = async ({ numero_do_pedido, cliente, valor_total_do_pedido }) => {
    valor_total_do_pedido = parseFloat(valor_total_do_pedido);

    if (numero_do_pedido == '' || cliente == '' || isNaN(valor_total_do_pedido) || valor_total_do_pedido < 0)
        return false;

    const pedidos_controller = {
        numero_do_pedido,
        cliente,
        valor_total_do_pedido
    }

    try {
        let db = await connection();

        insert = await db.query("INSERT INTO pedidos (numero_do_pedido, cliente,valor_total_do_pedido) VALUES (?, ?, ?)", [pedidos_controller.numero_do_pedido, pedidos_controller.cliente, pedidos_controller.valor_total_do_pedido]);

        if (insert[0].affectedRows == 1) {
            pedidos_controller.id = insert[0].insertId;
        }
    } catch (error) {
        console.log(error);
        return false;
    }

    return pedidos_controller;
}

const update = async (id, numero_do_pedido, cliente, valor_total_do_pedido) => {
    valor_total_do_pedido = parseFloat(valor_total_do_pedido);

    if (numero_do_pedido == '' || cliente == '' || isNaN(valor_total_do_pedido) || valor_total_do_pedido < 0)
        return false;

    try {
        let db = await connection();

        let pedido = await find(id);
        if (!pedido) return false;

        pedido.numero_do_pedido = numero_do_pedido;
        pedido.cliente = cliente;
        pedido.valor_total_do_pedido = valor_total_do_pedido;

        ret = await db.query("UPDATE pedidos SET numero_do_pedido = ?, cliente = ?, valor_total_do_pedido = ? WHERE id = ?", [numero_do_pedido, cliente, valor_total_do_pedido, pedido.id]);

        if (ret[0].affectedRows == 1) {
            return pedido;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}

const destroy = async(id) =>{
    try{
        let db = await connection();

        let pedido = await find(id);
        if(!pedido) return false;

        ret = await db.query("DELETE FROM pedidos WHERE id = ?", [ id]);

        return pedido;
    }catch(error){
        return false;
    }
}



module.exports = {
    findAll,
    find,
    create,
    update,
    destroy

}