const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

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

router.post("/login", (req, res) => {
  let { name, password } = req.body;
  User.findOne({
    name,
    password
  })
    .then(userInfo => {
      let data = {};
      if (!userInfo) {
        data["status"] = 1;
        data["message"] = "user is not exist.";
        responseClient(res, 200, 0, "登录失败", data);
        return;
      }
      data["status"] = 0;
      data["profileInfo"] = {
        name: userInfo.name,
        email: userInfo.email
      };
      data["accessToken"] = jwt.sign(data, "my_token", { expiresIn: "1h" });
      // let sessionInfo = {
      //   username: userInfo.username,
      //   password: userInfo.password
      // };
      // req.session.userInfo = sessionInfo;
      responseClient(res, 200, 0, "登录成功", data);
    })
    .catch(e => {
      console.log(e);
    });
});

router.post("/register", (req, res) => {
  let { name, password } = req.body;
  User.findOne({
    name: name
  })
    .then(findResult => {
      if (findResult) {
        let data = {
          status: 0
        };
        responseClient(res, 200, 0, "User存在", data);
        return;
      } else {
        let user = new User({
          name: name,
          password: password,
          type: "normal"
        });
        user
          .save()
          .then(saveResult => {
            User.findOne({
              name: name
            })
              .then(findResult => {
                var data = {
                  status: 0
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
    status: 0
  };
  responseClient(res, 200, 0, "登出成功", data);
});

module.exports = router;
