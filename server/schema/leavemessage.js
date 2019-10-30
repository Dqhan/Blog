/**
 * leavemessage 表结构
 **/

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    content: String,//留言内容
    time: String,//留言时间
    author: String//留言人
});