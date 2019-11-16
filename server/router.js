const userCtrl = require("./controller/UserController");
const articleCtrl = require("./controller/ArticleController");
const deliverCtrl = require("./controller/DeliverController");
const leavemsgCtrl = require("./controller/LeaveMsgController");
const oauthCtrl = require("./controller/OAuthContoller");
const documentCtrl = require("./controller/DocumentController");
const Router = require("koa-router");

let router = new Router();
/**
 * 二级路由分发
 */
router
  .post('/api/user/login', userCtrl.login) //用户登录
  .post('/api/user/register', userCtrl.register) //用户注册
  .get('/api/user/logout', userCtrl.logout)//用户退出
  .put('/api/user/put', userCtrl.put)//用户修改资料
  .put('/api/user/resetpwd', userCtrl.resetpwd)//用户重置密码
  .delete('/api/user/deluser', userCtrl.deluser)//删除用户

router
  .post('/api/article/addarticle', articleCtrl.addarticle)// 增加文章
  .delete('/api/article/delarticle', articleCtrl.delarticle)//删除文章
  .put('/api/article/putarticle', articleCtrl.putarticle)//修改文章
  .get('/api/article/getartcile', articleCtrl.getartciledetail)//查看文章内容
  .post('/api/article/getartciles', articleCtrl.getartciles)//获取所有文章

router
  .post('/api/deliver/adddeliver', deliverCtrl.adddeliver)//增加文章评论
  .delete('/api/deliver/deldeliver', deliverCtrl.deldeliver)//删除文章评论
  .put('/api/deliver/putdeliver', deliverCtrl.putdeliver)//修改文章评论
  .get('/api/deliver/getdelivers', deliverCtrl.getdelivers)

router
  .post('/api/leavemsg/addmsg', leavemsgCtrl.addmsg) //增加留言
  .delete('/api/leavemsg/delmsg', leavemsgCtrl.delmsg)//删除留言
  .put('/api/leavemsg/putmsg', leavemsgCtrl.putmsg)//修改留言
  .post('/api/leavemsg/getmsgs', leavemsgCtrl.getmsgs)//获取所有留言

router
  .post('/api/document/upload', documentCtrl.upload)


router
  .post('/api/oauth/getgithubtoken', oauthCtrl.getgithubtoken)//获取githubtoken

module.exports = router;