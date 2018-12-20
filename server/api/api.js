var express = require('express');
var mongoose = require('mongoose');
var config = require('../../config/config');

const app = new express();

app.use('/article', require('./article'))
app.use('/leavemessage', require('./leavemessage'))
app.use('/about', require('./about'));
app.use('/user', require('./user'));


mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(3030, () => console.log('Example app listening on port 3030!'));
});
