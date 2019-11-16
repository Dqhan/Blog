const conn = require('../conn');

class Article {
    static async insertArticle(model) {
        let sql = `INSERT INTO article ( article_id, title, content, view_count, time, author, tags) VALUES('${model.article_id}','${model.title}',"${model.content}",'${model.view_count}',${model.time},'${model.author}','${model.tags}')`;
        let data = await conn.query(sql);
        return data;
    }

    static async delArticle(id) {
        let sql = `DELETE FROM article WHERE article_id='${id}'`;
        let data = await conn.query(sql);
        return data;
    }

    static async getartcile(id) {
        let sql = `SELECT * FROM article WHERE article_id='${id}'`;
        let data = await conn.query(sql);
        return data;
    }

    static async getartciles() {
        let sql = `SELECT * FROM article`;
        let data = await conn.query(sql);
        return data;
    }

}

module.exports = Article;