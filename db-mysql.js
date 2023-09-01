const mysql = require('mysql2/promise');

async function connection(){

    let db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "",
        database: 'teste2'
    });

    return db;
}

module.exports = connection