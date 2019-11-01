const md5 = require('md5-node');
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const UserSerivce = require('../service/userService');
const UserModel = require('../Infrastructure/userModel');
const Util = require('../util');
class UserController {
    static async login(ctx) {
        let { username, password} = ctx.request.body;
        if (toString.call(username) === "[object Undefined]") {
            ctx.response.type = "json";
            ctx.response.status = 503;
            ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Fail, "username 没传");
        }
        if (toString.call(password) === "[object Undefined]") {
            ctx.response.type = "json";
            ctx.response.status = 503;
            ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Fail, "password 没传");
        }
        let searchResult = await UserSerivce.getUser(username);
        if (searchResult.length > 0) {
            let target = searchResult[0];
            if (target.password === md5(password)) {
                let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: JSON.stringify({
                        id: target.user_id,
                        name: target.username
                    })
                }, Util.SECERT);
                ctx.response.type = "json";
                ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, "登录成功", token);
                ctx.response.status = 200;
            } else {
                ctx.response.type = "json";
                ctx.response.status = 200;
                ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Fail, "密码错了");
            }
        } else {
            ctx.response.type = "json";
            ctx.response.status = 200;
            ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Fail, "没有此用户");
        }
    }

    static async register(ctx) {
        let { username, password, type } = ctx.request.body;
        if (toString.call(username) === "[object Undefined]") {
            ctx.response.type = "json";
            ctx.response.body =Util.responseBody(Util.RESPONSETYPE.Fail, "用户名没传", token);
            ctx.response.status = 503;
        }
        if (toString.call(password) === "[object Undefined]") {
            ctx.response.type = "json";
            ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Fail, "密码没传", token);
            ctx.response.status = 503;
        }
        password = md5(password);
        type = type || USERTYPE.Normal;
        let searchResult = await UserSerivce.getUser(username);
        if (searchResult.length === 0) {
            let user_id = uuid.v4();
            let user = new UserModel({
                user_id,
                username,
                password,
                type
            });
            UserSerivce.insertUser(ctx, user);
        } else {
            ctx.response.type = "json";
            ctx.response.body = "用户已存在";
            ctx.response.status = 200;
        }
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

module.exports = UserController;