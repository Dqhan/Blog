const express = require("express");
const router = express.Router();
const User = require("../../models/user");

function responseClient(
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
  res.status(httpCode).json(responseData);
}

router.get("/userInfo", (req, res) => {
  if (req.session.userInfo) {
    res.send({
      userInfo: req.session.userInfo,
      message: "User有效",
      status: 'success'
    });
  } else {
    res.send({
      userInfo: null,
      message: "登录超时",
      status: 'failed'
    });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  User.findOne({
    username,
    password
  })
    .then(userInfo => {
      let data = {};
      if (!userInfo) {
        data["status"] = "failed";
        data["message"] = "user is not exist.";
        responseClient(res, 200, 0, "登录失败", data);
        return;
      }
      data["username"] = userInfo.username;
      data["status"] = "success";
      let sessionInfo = {
        username: userInfo.username,
        password: userInfo.password
      };
      req.session.userInfo = sessionInfo;
      responseClient(res, 200, 0, "登录成功", data);
    })
    .catch(e => {
      console.log(e);
    });
});

router.post("/register", (req, res) => {
  let { userName, password } = req.body;
  User.findOne({
    username: userName
  })
    .then(findResult => {
      if (findResult) {
        responseClient(res, 200, 0, "User存在", data);
        return;
      } else {
        let user = new User({
          username: userName,
          password: password,
          type: "normal"
        });
        user
          .save()
          .then(saveResult => {
            User.findOne({
              username: userName
            })
              .then(findResult => {
                var data = {
                  status: "success"
                };
                responseClient(res, 200, 0, "注册成功", data);
              })
              .catch(e => {
                console.log(e);
              });
          })
          .catch(e => {
            console.log(e);
          });
      }
    })
    .catch(e => {
      console.log(e);
    });
});

router.get("/logout", function(req, res) {
  req.session.destroy();
  var data = {
    status: "success"
  };
  responseClient(res, 200, 0, "登出成功", data);
});

module.exports = router;
