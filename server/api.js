const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const busboy = require("koa-busboy");
const Router = require("koa-router");
const jwt = require("koa-jwt");
const util = require("./util");

const userCtrl = require("./controller/UserController");
const articleCtrl = require("./controller/ArticleController");
const deliverCtrl = require("./controller/DeliverController");
const leavemsgCtrl = require("./controller/LeaveMsgController");
const oauthCtrl = require("./controller/OAuthContoller");

let app = new Koa();
let router = new Router();

app.use(busboy());
app.use(bodyParser());
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
/**
 * 二级路由分发
 */
router
  .post('/api/user/login', userCtrl.login) //用户登录
  .post('/api/user/register', function(){
    console.log('ssss');
  }) //用户注册
  .get('/api/user/logout', userCtrl.logout)//用户退出
  .put('/api/user/put', userCtrl.put)//用户修改资料
  .put('/api/user/resetpwd', userCtrl.resetpwd)//用户重置密码
  .delete('/api/user/deluser', userCtrl.deluser)//删除用户

// router
//   .post('/api/article/addarticle', articleCtrl.addarticle)// 增加文章
//   .delete('/api/article/delarticle', articleCtrl.delarticle)//删除文章
//   .put('/api/article/putarticle', articleCtrl.putarticle)//修改文章
//   .get('/api/article/getartcile', articleCtrl.getartciledetail)//查看文章内容
//   .post('/api/article/getartciles', articleCtrl.getartciles)//获取所有文章

// router
//   .post('/api/deliver/adddeliver', deliverCtrl.adddeliver)//增加文章评论
//   .delete('/api/deliver/deldeliver', deliverCtrl.deldeliver)//删除文章评论
//   .put('/api/deliver/putdeliver', deliverCtrl.putdeliver)//修改文章评论

// router
//   .post('/api/leavemsg/addmsg', leavemsgCtrl.addmsg) //增加留言
//   .delete('/api/leavemsg/delmsg', leavemsgCtrl.delmsg)//删除留言
//   .put('/api/leavemsg/putmsg', leavemsgCtrl.putmsg)//修改留言
//   .get('/api/leavemsg/getmsgs', leavemsgCtrl.getmsgs)//获取所有留言


// router
//   .post('/api/oauth/getgithubtoken', oauthCtrl.getgithubtoken)//获取githubtoken

app.listen(3030, () => console.log("Example app listening on port 3030!"));
// mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, function (
//   err
// ) {
//   if (err) {
//     console.log(err, "数据库连接失败");
//     return;
//   }
//   console.log("数据库连接成功");

//   app.listen(3030, () => console.log("Example app listening on port 3030!"));
// });
