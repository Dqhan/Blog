const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const busboy = require("koa-busboy");
const router  = require('./router');
const jwt = require("koa-jwt");
const util = require("./util");

let app = new Koa();

/**
 * app.use注册文件处理
 */
app.use(busboy());
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
// app.use((ctx, next) => {
//   return next().catch((err) => {
//     if (err.status === 401) {
//       ctx.status = 401;
//       ctx.body = 'Protected resource, use Authorization header to get access\n';
//     } else {
//       throw err;
//     }
//   })
// })
// app.use(jwt({
//   secret: 'jwt_token'
// }).unless({
//   path: util.whiteList
// }));

app.listen(3030, () => console.log("Example app listening on port 3030!"));