const connection = require('./db-mysql');

const findAll = async () => {
    const db = await connection();
    const [rows] = await db.query("SELECT * FROM menu_products;");
    return rows;
}

const find = async (id) => {
    const db = await connection();
    const [menu] = await db.query("SELECT * FROM menu_products WHERE id = ?", [id]);
    return (menu[0] ?? null);
};

const create = async (id, name, price, menu, extras) => {
    if (!id || !name || !price || !menu || !extras) return false;

    let newMenu;
    try {
        const db = await connection();
        const result = await db.query("INSERT INTO menu_products (id, name, price, menu, extras) VALUES (?, ?, ?, ?, ?)", [id, name, price, menu, extras]);
        newMenu = {id, name, price, menu, extras};
    } catch(e) {
        console.log(e);
        return false;
    }

    return newMenu;
}

module.exports = {
    findAll,
    find,
    create,
    
}
