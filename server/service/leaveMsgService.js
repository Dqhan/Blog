const conn = require('../conn');

class LeaveMsgService {
    static async addMsg(model) {
        model.content = model.content;
        let sql = `INSERT INTO leavemessage ( leavemsg_id, content, time, author) VALUES ('${model.leavemsg_id}','${model.content}','${model.time}','${model.author}')`;
        return await conn.query(sql);
    }

    static async delMsg(id) {
        let sql = `DELETE FROM leavemessage WHERE leavemsg_id=${id}`;
        return await conn.query(sql);
    }

    static async putMsg() {

    }

    static async getMsgs() {
        let sql = `SELECT * FROM leavemessage`;
        return await conn.query(sql);
    }
}

module.exports = LeaveMsgService;