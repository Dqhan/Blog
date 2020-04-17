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
    '/oauth/api/getgithubtoken',
    '/document/api/upload',
    '/document/api/peoplepickermetadata',
    '/user/api/login',
    '/user/api/register',
    '/user/api/logout',
    '/user/api/put',
    '/user/api/resetpwd',
    '/user/api/deluser',
    '/blog/api/addarticle',
    '/blog/api/delarticle',
    '/blog/api/putarticle',
    '/blog/api/getartcile',
    '/blog/api/getartciles',
    '/blog/api/adddeliver',
    '/blog/api/deldeliver',
    '/blog/api/putdeliver',
    '/blog/api/getdelivers',
    '/leavemsg/api/addmsg',
    '/leavemsg/api/delmsg',
    '/leavemsg/api/putmsg',
    '/leavemsg/api/getmsgs'
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
