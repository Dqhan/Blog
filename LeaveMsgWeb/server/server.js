const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require('./router');
const static = require('koa-static');
const path = require('path');

let app = new Koa();

app.use(bodyParser());

app.use(static(path.join(__dirname, "../www/")));

app.use(router.routes(), router.allowedMethods())


app.listen(3007, () => console.log("leave message web server is running listening on port 3007."));
