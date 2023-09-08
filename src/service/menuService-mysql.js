const connection = require('./db-mysql');

const findAll = async () => {
    let db = await connection();
    let [ rows ] = await db.query("SELECT * FROM menu.menu_products;");
    return rows;
}

const find = async (id) => {
    let db = await connection();
    let [ menu] = await db.query("SELECT * FROM menu_products WHERE id = ?", id);

    return (menu[0] ?? null);
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

        insert = await db.query("INSERT INTO menu_products (name, price,menu,extras) VALUES (?, ?, ?, ?)", [ menu_controller.name, menu_controller.price, menu_controller.menu, menu_controller.extras ] );

        if (ret[0].affectedRows==1){
            menu_controller.id = ret[0].insertId;
        }
    }catch(e){
        console.log(e);
        return false;
    }

    return menu_controller;
}

const update =  async (id, name, price, menu, extras) => {
    if (!name || !price || !menu || !extras) {
        console.log('Por favor, forneça valores válidos para name, price, menu e extras');
        return;
    }

    try {
        let db = await connection();
    
        let product = await find(id);
        if (!product) return false;
    
        ret = await db.query("UPDATE menu_products SET name = ?, price = ?, menu = ?, extras = ? WHERE id = ?", [ name, price, menu, extras, product.id ] );
    
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

        ret = await db.query("DELETE FROM menu_products WHERE id = ?", [ id ] );

        return product;
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