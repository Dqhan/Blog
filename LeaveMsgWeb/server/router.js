const leavemsgCtrl = require("./controller/LeaveMsgController");
const Router = require("koa-router");
let router = new Router();

/**
 * 二级路由分发
 */
router
  .post('/leavemsg/api/addmsg', leavemsgCtrl.addmsg) //增加留言
  .delete('/leavemsg/api/delmsg', leavemsgCtrl.delmsg)//删除留言
  .put('/leavemsg/api/putmsg', leavemsgCtrl.putmsg)//修改留言
  .post('/leavemsg/api/getmsgs', leavemsgCtrl.getmsgs)//获取所有留言


module.exports = router;