const conn = require('../conn');

class UserSerivce {
    static async insertUser(ctx, model) {
        let sql = `INSERT INTO user (user_id,username,password,type) VALUES('${model.user_id}','${model.username}','${model.password}','${model.type}')`;
        let data = await conn.query(sql);
        return data;
    }
    static async getUser(username) {
        let sql = `SELECT * FROM user WHERE username = '${username}'`;
        let data = await conn.query(sql);
        return data;
    }
}

module.exports = UserSerivce;