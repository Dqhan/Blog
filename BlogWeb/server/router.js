const articleCtrl = require("./controller/ArticleController");
const deliverCtrl = require("./controller/DeliverController");
const Router = require("koa-router");
let router = new Router();

/**
 * 二级路由分发
 */

router
  .post('/blog/api/addarticle', articleCtrl.addarticle)// 增加文章
  .delete('/blog/api/delarticle', articleCtrl.delarticle)//删除文章
  .put('/blog/api/putarticle', articleCtrl.putarticle)//修改文章
  .get('/blog/api/getartcile', articleCtrl.getartciledetail)//查看文章内容
  .post('/blog/api/getartciles', articleCtrl.getartciles)//获取所有文章

router
  .post('/blog/api/adddeliver', deliverCtrl.adddeliver)//增加文章评论
  .delete('/blog/api/deldeliver', deliverCtrl.deldeliver)//删除文章评论
  .put('/blog/api/putdeliver', deliverCtrl.putdeliver)//修改文章评论
  .get('/blog/api/getdelivers', deliverCtrl.getdelivers)


module.exports = router;