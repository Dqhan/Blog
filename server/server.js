var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

// var config = require('../config/config');

var config = require('../config/config');


const app = express();

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl })
});

app.use('/test', (req, res) => {
  res.send('hello')
});

app.use('/', express.static(path.join(__dirname, "..", 'build')));

const proxy = httpProxy.createProxyServer({
  target: targetUrl
});

/*端口有上限 */
app.listen(2999, () => console.log('Example app listening on port 2999!'));

module.exports = app;