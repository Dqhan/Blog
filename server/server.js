const Koa = require("koa");
const path = require("path");
const static = require('koa-static');
const config = require("../config/config");
const proxy = require('http-proxy-middleware');
const k2c = require('koa-connect');

let app = new Koa();
app.use(static(path.join(__dirname, "..")));

let targetUrl = `http://${config.apiHost}:${config.apiPort}`;

// let targetUrl = `10.2.118.52:3030`;

app.use(async (ctx, next) => {
  if(ctx.url.startsWith('/api')){
    ctx.respond = false;
    await k2c(proxy({
      target: targetUrl
    }))(ctx, next);
  }else{
    await next();
  }
})

/*端口有上限 */
app.listen(80, () =>
  console.log("Server is running succsessfully on 80 port.")
);

module.exports = app;
