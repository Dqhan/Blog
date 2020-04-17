const mysql = require('mysql');
const co = require('co-mysql');

let db = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'blog'
})

let conn = co(db);

module.exports = conn;