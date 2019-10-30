const md5 = require('md5-node');
const mysql = require('mysql');
const co = require('co-mysql');
const Koa = require('koa');

let app = new Koa();

let db = mysql.createPool({
    connectionLimit: 10,
    host: 'locahost',
    user: 'root',
    password: 'MAY!131415210',
    database: 'blog'
})

let conn = co(db);

class UserController {
    static async login(ctx) {

    }

    static async register(ctx) {
        let username = ctx.username;
        let sql = `SELECT user FROM user WHERE name = ${username}`;
        let data = await conn.query(sql);

    }

    static async logout(ctx) {

    }

    static async put(ctx) {

    }

    static async deluser(ctx) {

    }

    static async  resetpwd(ctx) {

    }
}

module.exports =  UserController;