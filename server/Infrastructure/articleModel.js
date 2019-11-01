/**
 * article 表结构
 */
class Article {
    constructor(props) {
        let { article_id, title, content, view_count, time, author, tags } = props;
        this.article_id = article_id;
        this.title = title;
        this.content = content;
        this.view_count = view_count;
        this.time = time;
        this.author = author;
        this.tags = tags;
    }
}

module.exports = Article;
