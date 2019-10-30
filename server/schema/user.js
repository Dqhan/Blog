/**
 * 用户的表结构
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    password: String,
    type: String//管理员、普通用户
});


