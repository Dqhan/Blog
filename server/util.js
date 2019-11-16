var crypto = require("crypto");

module.exports = {
  MD5_SUFFIX:
    "eiowafnajkdlfjsdkfj大姐夫文姐到了困难额我积分那看到你@#￥%……&）（*&……）",
  md5: function (pwd) {
    let md5 = crypto.createHash("md5");
    return md5.update(pwd).digest("hex");
  },
  responseClient(
    res,
    httpCode = 500,
    code = 3,
    message = "服务端异常",
    data = {}
  ) {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.data = data;
    return res.status(httpCode).json(responseData);
  },
  whiteList: [
    '/api/oauth/getgithubtoken',
    "/api/document/upload",
    '/api/user/login',
    '/api/user/register',
    '/api/user/logout',
    '/api/user/put',
    '/api/user/resetpwd',
    '/api/user/deluser',
    '/api/article/addarticle',
    '/api/article/delarticle',
    '/api/article/putarticle',
    '/api/article/getartcile',
    '/api/article/getartciles',
    '/api/deliver/adddeliver',
    '/api/deliver/deldeliver',
    '/api/deliver/putdeliver',
    'api/deliver/getdelivers',
    '/api/leavemsg/addmsg',
    '/api/leavemsg/delmsg',
    '/api/leavemsg/putmsg',
    '/api/leavemsg/getmsgs'
  ],
  USERTYPE: {
    Normal: 0,
    Admin: 1
  },
  RESPONSETYPE: {
    Success: 0,
    Fail: 1
  },
  responseBody: function (type, message, data) {
    var clr = {
      [this.RESPONSETYPE.Success]: function () {
        return {
          status: 0,
          message: message,
          result: data || {}
        }
      },
      [this.RESPONSETYPE.Fail]: function () {
        return {
          status: 1,
          message: message,
          result: data || {}
        }
      }
    }
    return clr[type]();
  },
  SECERT: "MORAN1992"
};
