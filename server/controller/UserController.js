const md5 = require('md5-node');
const conn  =require('../conn');
const jwt = require("jsonwebtoken");

class UserController {
    static async login(ctx) {

    }

    static async register(ctx) {
        let username = ctx.username;
        let sql = `SELECT user FROM user WHERE name = ${username}`;

        let data = await conn.query(sql);
        ctx.response.type = "json";
        ctx.response.body = data;
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