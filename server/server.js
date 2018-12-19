var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var config = require('../config/config');

const app = express();

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl })
});

app.use('/', express.static(path.join(__dirname, "..", 'build')));

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
  target: targetUrl
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/*端口有上限 */
app.listen(2999, () => console.log('Example app listening on port 2999!'));

module.exports = app;