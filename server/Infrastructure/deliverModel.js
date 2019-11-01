/**
 * deliver 表结构
 */
class Deliver {
    constructor(props) {
        let { deliver_id, article_title, content, time, author } = props;
        this.deliver_id = deliver_id;
        this.article_title = article_title;
        this.content = content;
        this.time = time;
        this.author = author;
    }
}

module.exports = Deliver;
