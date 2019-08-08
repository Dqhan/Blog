var mongoose = require('mongoose');
var articleSchema = require('../schemas/comment');

module.exports = mongoose.model('Comment', articleSchema);