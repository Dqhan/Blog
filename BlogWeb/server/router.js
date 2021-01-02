const articleCtrl = require("./controller/ArticleController");
const deliverCtrl = require("./controller/DeliverController");
const Router = require("koa-router");
let router = new Router();

/**
 * 二级路由分发
 */

router
  .post('/blog/addarticle', articleCtrl.addarticle)// 增加文章
  .delete('/blog/delarticle', articleCtrl.delarticle)//删除文章
  .put('/blog/putarticle', articleCtrl.putarticle)//修改文章
  .get('/blog/getartcile', articleCtrl.getartciledetail)//查看文章内容
  .post('/blog/getartciles', articleCtrl.getartciles)//获取所有文章

router
  .post('/blog/adddeliver', deliverCtrl.adddeliver)//增加文章评论
  .delete('/blog/deldeliver', deliverCtrl.deldeliver)//删除文章评论
  .put('/blog/putdeliver', deliverCtrl.putdeliver)//修改文章评论
  .get('/blog/getdelivers', deliverCtrl.getdelivers)


module.exports = router;