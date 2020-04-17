const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const busboy = require("koa-busboy");
const router = require('./router');
const jwt = require("koa-jwt");
const Util = require("./util");
// const conditional = require('koa-conditional-get');
// const etag = require('koa-etag');

let app = new Koa();
// app.use(conditional());
// app.use(etag());
/**
 * app.use注册文件处理
 */
app.use(busboy({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));
/**
 * app.use注册post请求参数解析
 */
app.use(bodyParser());
/**
 * app.use注册路由
 */
app.use(router.routes(), router.allowedMethods())
/**
 * 验证token
 */
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = Util.responseBody(Util.RESPONSETYPE.Fail, 'Protected resource, use Authorization header to get access\n');
        } else {
            throw err;
        }
    })
})
app.use(jwt({
    secret: Util.SECERT
}).unless({
    path: Util.whiteList
}));

app.listen(3030, () => console.log("Api server listening on port 3030."));