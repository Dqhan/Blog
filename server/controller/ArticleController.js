const uuid = require('uuid');
const ArticleModel = require('../Infrastructure/articleModel');
const ArticleService = require('../service/articleService');
const Util = require('../util');

class ArticleController {
    static async addarticle(ctx) {
        let { title, content, time, view_count, author, tags } = ctx.response.body;
        if (toString.call(title) === "[object Undefined]" ||
            toString.call(content) === "[object Undefined]" ||
            toString.call(time) === "[object Undefined]" ||
            toString.call(view_count) === "[object Undefined]" ||
            toString.call(author) === "[object Undefined]" ||
            toString.call(tags) === "[object Undefined]") {
            ctx.response.type = "json";
            ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Fail, "add article post请求参数没传全");
            ctx.response.status = 503;
        }
        let article_id = uuid.v4();
        let model = new ArticleModel({
            article_id,
            title,
            content,
            view_count,
            time,
            author,
            tags
        });
        ArticleService.insertUser(ctx, model);
    }

    static async delarticle(ctx) {

    }

    static async putarticle(ctx) {

    }

    static async getartciledetail(ctx) {

    }

    static async getartciles(ctx) {

    }

}

module.exports = ArticleController;