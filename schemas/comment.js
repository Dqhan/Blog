/**
 * comments 表结构
 **/

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    articleTitle: String,//文章标题
    content: String,//评论内容
    time: String,//发表时间
    author: String,//评论人
    articleId: String
});