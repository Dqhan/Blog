const Koa = require("koa");
const path = require("path");
const static = require('koa-static');
const config = require("./config.js");
const proxy = require('http-proxy-middleware');
const k2c = require('koa-connect');
// const conditional = require('koa-conditional-get');
// const etag = require('koa-etag');

let app = new Koa();
app.use(static(path.join(__dirname, "../www/dist/")));
// app.use(static(path.join(__dirname, "../www/")));

// app.use(conditional());
// app.use(etag());

function getTargetUrl(type) {
    var map = {
        document: `http://${config.HOST.DOCUMENT_HOST.IP}:${config.HOST.DOCUMENT_HOST.Port}`,
        user: `http://${config.HOST.USER_HOST.IP}:${config.HOST.USER_HOST.Port}`,
        blog: `http://${config.HOST.BLOG_HOST.IP}:${config.HOST.BLOG_HOST.Port}`,
        // deliver: `http://${config.HOST.DELIVER_HOST.IP}:${config.HOST.DELIVER_HOST.Port}`,
        leavemsg: `http://${config.HOST.LEAVEMSG_HOST.IP}:${config.HOST.LEAVEMSG_HOST.Port}`,
    }
    return map[type];
}

app.use(async (ctx, next) => {
    var targetUrl;
    if (ctx.url.startsWith('/document')) targetUrl = getTargetUrl('document');
    if (ctx.url.startsWith('/user')) targetUrl = getTargetUrl('user');
    if (ctx.url.startsWith('/blog')) targetUrl = getTargetUrl('blog');
    // if (ctx.url.startsWith('/deliver')) targetUrl = getTargetUrl('deliver');
    if (ctx.url.startsWith('/leavemsg')) targetUrl = getTargetUrl('leavemsg');
    if (targetUrl) {
        await k2c(proxy({
            target: targetUrl
        }))(ctx, next);
    } else {
        await next();
    }
})

app.listen(1000, () =>
    console.log("common web server is running succsessfully on 1000 port.")
);
