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

const create = async ( { name, price, menu, adicionais }) =>{
    price = parseFloat(price);
    if (name==''  || price ===''|| menu==='' || adicionais=='' ||price<0) return false;

    const menu_controller = {
        name,
        price,
        menu,
        adicionais
    }

    try {
        let db = await connection();

        ret = await db.query("INSERT INTO menu_products (name, price,menu,adicionais) VALUES (?, ?, ?, ?)", [ menu_controller.name, menu_controller.price, menu_controller.menu, menu_controller.adicionais ] );

        if (ret[0].affectedRows==1){
            menu_controller.id = ret[0].insertId;
        }
    }catch(e){
        console.log(e);
        return false;
    }

    return menu_controller;
}

const update =  async (id, name, price, menu, adicionais) => {
    if (!name || !price || !menu || !adicionais) {
        console.log('Por favor, forneça valores válidos para name, price, menu e adicionais');
        return;
    }

    try {
        let db = await connection();
    
        let product = await find(id);
        if (!product) return false;
    
        ret = await db.query("UPDATE menu_products SET name = ?, price = ?, menu = ?, adicionais = ? WHERE id = ?", [ name, price, menu, adicionais, product.id ] );
    
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