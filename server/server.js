const Koa = require("koa");
const path = require("path");
const static = require('koa-static');
const config = require("../config/config");
const proxy = require('http-proxy-middleware');
const k2c = require('koa-connect');

let app = new Koa();
app.use(static(path.join(__dirname, "..")));
/**
 * 代理转发目标Url
 */
let targetUrl = `http://${config.apiHost}:${config.apiPort}`;
/**
 * 代理转发
 */
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
/**
 * 端口有上限
 */
app.listen(80, () =>
  console.log("Server is running succsessfully on 80 port.")
);
