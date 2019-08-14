var express = require('express');
var mongoose = require('mongoose');
var config = require('../../config/config');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

const app = new express();


app.use(busboy());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(cookieParser('express_react_cookie'))
app.use(session({
    secret: 'express_react_cookie',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 30 },
    rolling: true,
    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/blog',
        collection: 'sessions'
    })
}))


app.use('/article', require('./article'))
app.use('/leavemessage', require('./leavemessage'))
app.use('/about', require('./about'));
app.use('/user', require('./user'));
app.use('/document', require('./document'));
app.use('/oauth', require('./oauth'))

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(3030, () => console.log('Example app listening on port 3030!'));
});
