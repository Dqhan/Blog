/**
 * article 表结构
 **/

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: String,//文章标题
    content: String,//文章内容
    article: String,
    viewCount: Number,//浏览次数
    commentCount: Number,//评论次数
    time: String,//发表时间
    author: String,//作者
    test:Number
});