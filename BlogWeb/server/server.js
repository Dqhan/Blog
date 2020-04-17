const Koa = require("koa");
const static = require('koa-static');
const bodyParser = require("koa-bodyparser");
const path = require("path");
const router = require('./router');

let app = new Koa();
app.use(static(path.join(__dirname, "../www/")));
app.use(bodyParser());

app.use(router.routes(), router.allowedMethods())

app.listen(3032, () => console.log("Blog server is running successfully listening on port 3032."));