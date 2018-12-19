var express = require('express');

const app = new express();

app.use('/about', require('./about'));
app.use('/article',require(''))

app.listen(3030, () => console.log('Example app listening on port 3030!'));