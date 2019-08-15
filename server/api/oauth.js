const express = require("express");
const router = express.Router();
const axios = require("axios");

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

router.post("/oAuthValidate", (req, res) => {
  let { clientId, clientSecret, code } = req.body;
  axios({
    method: "post",
    url:
      "https://github.com/login/oauth/access_token?" +
      `client_id=${clientId}&` +
      `client_secret=${clientSecret}&` +
      `code=${code}`,
    headers: {
      accept: "application/json"
    }
  })
    .then(tokenResponse => {
      let accessToken = tokenResponse.data.access_token;
      getGitHubToken(accessToken, res);
    })
    .catch(e => {
      console.log(e);
    });
});

function getGitHubToken(accessToken, res) {
  axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      accept: "application/json",
      Authorization: `token ${accessToken}`
    }
  })
    .then(result => {
      let data = result.data;
      responseClient(res, 200, 0, "获取github token成功", data);
    })
    .catch(e => {
      console.log(e);
    });
}

router.post("/loginGitHub", function(req, res) {
  let {name}  = req.body;
  let sessionInfo = {
    username: name,
    password: userInfo.password
  };
  req.session.userInfo = sessionInfo;
  responseClient(res, 200, 0, "登录成功", data);
});

module.exports = router;
