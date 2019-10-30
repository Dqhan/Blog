const router = require('koa-router')();
const axios = require("axios");
const jwt = require("jsonwebtoken");
let util = require("../util");

router.post("/oAuthValidate", (req, res) => {
  let { clientId, clientSecret, code } = req.body;
  axios({
    method: "post",
    url: "https://github.com/login/oauth/access_token?" +
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
      let token = jwt.sign(result.data, "jwt_token", { expiresIn: "1h" });
      util.responseClient(res, 200, 0, "获取github token成功", {
        profileInfo: result.data,
        accessToken: token
      });
    })
    .catch(e => {
      util.responseClient(res, 500, 0, "get github token failed.", {
        message: e
      });
    });
}

module.exports = router;
