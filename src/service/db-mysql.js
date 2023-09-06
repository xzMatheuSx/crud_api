const mysql = require('mysql2/promise');

async function connection(){

    let db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "root",
        database: 'menu'
    });

    return db;
}

module.exports = connection