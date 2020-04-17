const conn = require('../conn');

class DeliverSevice {
    static async addDeliver(model) {
        let sql = `INSERT INTO deliver (deliver_id,article_id,article_title,content,time,author) VALUE ('${model.deliver_id}','${model.article_id}','${model.article_title}','${model.content}','${model.time}','${model.author}')`;
        return await conn.query(sql);
    }

    static async delDeliver() {

    }

    static async putDeliver() {

    }

    static async getDelivers(id) {
        let sql = `SELECT * FROM deliver WHERE article_id = '${id}'`;
        return await conn.query(sql);
    }
}

module.exports = DeliverSevice;