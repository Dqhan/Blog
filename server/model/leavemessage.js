var mongoose = require('mongoose');
var articleSchema = require('../schemas/leavemessage');

module.exports = mongoose.model('LeaveMessage', articleSchema);