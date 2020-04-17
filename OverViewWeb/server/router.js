const articleCtrl = require("./controller/ArticleController");
const deliverCtrl = require("./controller/DeliverController");
const Router = require("koa-router");
let router = new Router();

/**
 * 二级路由分发
 */

router
  .post('/article/api/addarticle', articleCtrl.addarticle)// 增加文章
  .delete('/article/api/delarticle', articleCtrl.delarticle)//删除文章
  .put('/article/api/putarticle', articleCtrl.putarticle)//修改文章
  .get('/article/api/getartcile', articleCtrl.getartciledetail)//查看文章内容
  .post('/article/api/getartciles', articleCtrl.getartciles)//获取所有文章

router
  .post('/deliver/api/adddeliver', deliverCtrl.adddeliver)//增加文章评论
  .delete('/deliver/api/deldeliver', deliverCtrl.deldeliver)//删除文章评论
  .put('/deliver/api/putdeliver', deliverCtrl.putdeliver)//修改文章评论
  .get('/deliver/api/getdelivers', deliverCtrl.getdelivers)


module.exports = router;