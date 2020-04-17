const documentCtrl = require("./controller");
const Router = require("koa-router");
let router = new Router();

/**
 * 二级路由分发
 */

router
    .post('/document/api/upload', documentCtrl.upload)
    .get('/document/api/peoplepickermetadata', documentCtrl.peoplepickermetadata)



module.exports = router;