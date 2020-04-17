const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const busboy = require("koa-busboy");
const router = require('./router');
const path = require('path');
const static = require('koa-static');

let app = new Koa();
/**
 * app.use注册文件处理
 */

app.use(static(path.join(__dirname, "../www/")));

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

app.listen(3031, () => console.log("Document Web server listening on port 3031."));