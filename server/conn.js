const mysql = require('mysql');
const co = require('co-mysql');

let db = mysql.createPool({
    connectionLimit: 10,
    host: 'locahost',
    user: 'root',
    port: '3306',
    password: 'MAY!131415210',
    database: 'blog'
})

let conn = co(db);

module.exports = conn;