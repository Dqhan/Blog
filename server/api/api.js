var express = require('express');
var mongoose = require('mongoose');
var config = require('../../config/config');
var bodyParser  = require('body-parser');
var busboy = require('connect-busboy');
var cookieParser  = require('cookie-parser');
var session = require('express-session');
const app = new express();


app.use(busboy());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser('express_react_cookie'))
app.use(session({
    secret:'express_react_cookie',
    resave: true,
    saveUninitialized:true,
    cookie: {maxAge: 60 * 1000 * 30}
}))


app.use('/article', require('./article'))
app.use('/leavemessage', require('./leavemessage'))
app.use('/about', require('./about'));
app.use('/user', require('./user'));
app.use('/document',require('./document'))

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(3030, () => console.log('Example app listening on port 3030!'));
});
