var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

// var config = require('../config/config');

var config = require('../config/config');


const app = express();
app.set('trust proxy', 1); 
const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
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