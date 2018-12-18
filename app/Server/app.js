var express = require('express');
var path = require('path');
import httpProxy from 'http-proxy';

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

const app = express();

app.use('/',Express.static(path.join(__dirname,"..",'build')));
// app.use('/',Express.static(path.join(__dirname,"..",'static')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
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