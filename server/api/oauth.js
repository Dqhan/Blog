const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
let util = require("../util");
let passport = require("./passport");

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
      // let token = jwt.sign(result.data, "my_token", { expiresIn: "1h" });
      util.responseClient(res, 200, 0, "获取github token成功", {
        profileInfo: result.data,
        accessToken: accessToken
      });
    })
    .catch(e => {
      util.responseClient(res, 500, 0, "get github token failed.", {
        message: e
      });
    });
}

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user", "repo"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);



// router.delete("/logoutWithGithub/:authorizationId", function(req, res) {
//   let authorizationId = req.params.authorizationId;
//   let clientId = "5f2b3eb585cd289ca088";
//   let clientSecret = "281abd4850f451b536416ddede3e3a61ccce07fe";
//   axios({
//     method: "delete",
//     // url: `https://api.github.com/:${clientId}/tokens/:${authorizationId}`,
//     url: `https://api.github.com/authorizations/:${authorizationId}`,
//     // headers: {
//     //   accept: "application/json"
//     // }
//     body:JSON.stringify({
//       username: clientId,
//       password : clientSecret
//     })
//   })
//     .then(result => {
//       var a = result;
//     })
//     .catch(e => {
//       util.responseClient(res, 500, 0, "delete github token failed.", {
//         log: "delete github token failed with http code 401."
//       });
//     });
// });

module.exports = router;
