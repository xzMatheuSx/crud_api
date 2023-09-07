const connection = require('./db-mysql');

const findAll = async () => {
    let db = await connection();
    let [ rows ] = await db.query("SELECT * FROM menu.menu_products;");
    return rows;
}

const find = async (id) => {
    let db = await connection();
    let [ restaurente] = await db.query("SELECT * FROM products WHERE id = ?", id);

    return (restaurente[0] ?? null);
};

const create = async ( { name, price, menu, extras }) => {
    price = parseFloat(price);
    if (name==''  || price ===''|| menu==='' || extras==='' ||price<0) return false;

    const menu_controller = {
        name,
        price,
        menu,
        extras
    }

    try {
        let db = await connection();

        ret = await db.query("INSERT INTO menu_products (name, price,menu,extras) VALUES (?, ?, ?, ?)", [ menu_controller.name, menu_controller.price, menu_controller.menu, menu_controller.extras ] );

        if (ret[0].affectedRows==1){
            menu_controller.id = ret[0].insertId;
        }
    }catch(e){
        console.log(e);
        return false;
    }

    return menu_controller;
}

const update = async (id, name, price) =>{
    price = parseFloat(price);
    if (name=='' || price==='' || price<0) return false;

    try {
        let db = await connection();

        let product = await find(id);
        if (!product) return false;

        product.name = name;
        product.price = price;

        ret = await db.query("UPDATE products SET ? WHERE id = ?", [ product, product.id ] );

        if (ret[0].affectedRows==1){
            return product;
        }
    }catch(e){
        console.log(e)
        return false;
    }
}

const destroy = async (id) => {
    try {
        let db = await connection();

        let product = await find(id);
        if (!product) return false;

        ret = await db.query("DELETE FROM products WHERE id = ?", [ id ] );

        return (ret[0].affectedRows);
    }catch(e){
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