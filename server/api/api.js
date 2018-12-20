var express = require('express');

const app = new express();

app.use('/article',require('./article'))
app.use('/leavemessage',require('./leavemessage'))
app.use('/about', require('./about'));

app.listen(3030, () => console.log('Example app listening on port 3030!'));