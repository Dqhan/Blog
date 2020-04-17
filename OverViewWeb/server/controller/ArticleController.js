const uuid = require('uuid');
const ArticleModel = require('../infrastructure/articleModel');
const ArticleService = require('../service/articleService');
const Util = require('../util');

class ArticleController {
    static async addarticle(ctx) {
        let { title, content, time, viewCount, author, tags } = ctx.request.body;
        if (toString.call(title) === "[object Undefined]" ||
            toString.call(content) === "[object Undefined]" ||
            toString.call(time) === "[object Undefined]" ||
            toString.call(viewCount) === "[object Undefined]" ||
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
            view_count: viewCount,
            time,
            author,
            tags
        });
        let result = await ArticleService.insertArticle(model);
        ctx.response.type = "json";
        ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, result.affectedRows >= 1 ? 'add article success.' : 'add article fail.', result.affectedRows);
        ctx.response.status = 200;

    }

    static async delarticle(ctx) {
        let { id } = ctx.response.body;
        let result = await ArticleService.delArticle(id);
        ctx.response.type = "json";
        ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, {
            message: result.affectedRows >= 1 ? 'success.' : 'fail.',
            result: result.affectedRows
        });
        ctx.response.status = 200;
    }

    static async putarticle(ctx) {

    }

    static async getartciledetail(ctx) {
        let { id } = ctx.request.query;
        let result = await ArticleService.getartcile(id);
        ctx.response.type = "json";
        ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, 'getarticledetail success.', result);
        ctx.response.status = 200;
    }

    static async getartciles(ctx) {
        let { tags, limit, offset } = ctx.request.body;
        let result = await ArticleService.getartciles();
        result.forEach(r => {
            r.tags = r.tags.split(',').map(r => parseInt(r));
        });
        if (toString.call(tags) !== '[object Undefined]') {
            if (tags.length !== 0) tags = tags.split(',').map(r => parseInt(r));
            if (result.length !== 0 && tags.length !== 0) {
                result = result.filter(d => {
                    return tags.filter(t => d.tags.includes(t)).length > 0;
                })
            }
        }
        let total = result.length;
        result.sort((pre, next) => {
            return parseInt(next.time) - parseInt(pre.time);
        });
        if (toString.call(offset) !== '[object Undefined]' && toString.call(limit) !== '[object Undefined]') {
            let startIndex = (offset - 1) * limit,
                endIndex = offset * limit;
            result = result.slice(startIndex, endIndex);
        }
        ctx.response.type = "json";
        ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, 'retrieve articiles success.', {
            source: result,
            total: total
        });
        ctx.response.status = 200;
    }

}

module.exports = ArticleController;