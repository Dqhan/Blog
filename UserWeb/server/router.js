const userCtrl = require("./controller/UserController");
const oauthCtrl = require("./controller/OAuthContoller");
const Router = require("koa-router");
let router = new Router();

/**
 * 二级路由分发
 */
router
  .post('/user/api/login', userCtrl.login) //用户登录
  .post('/user/api/register', userCtrl.register) //用户注册
  .get('/user/api/logout', userCtrl.logout)//用户退出
  .put('/user/api/put', userCtrl.put)//用户修改资料
  .put('/user/api/resetpwd', userCtrl.resetpwd)//用户重置密码
  .delete('/user/api/deluser', userCtrl.deluser)//删除用户

router
  .post('/oauth/api/getgithubtoken', oauthCtrl.getgithubtoken)//获取githubtoken

module.exports = router;