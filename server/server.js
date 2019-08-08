var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

// var config = require('../config/config');

var config = require('../config/config');
const cookie = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.set('trust proxy', 1); 

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;

//session in mongodb
app.use(cookie('express_cookie'));
app.use(session({
    secret: 'express_cookie',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 30 },
    rolling: true,
    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/blog',
        collection: 'sessions'
    })
}));

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl })
});

const proxy = httpProxy.createProxyServer({
  target: targetUrl
});

app.use('/', express.static(path.join(__dirname, "..", 'build')));

/*端口有上限 */
app.listen(80, () => console.log('Example app listening on port 80!'));

module.exports = app;