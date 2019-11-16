const axios = require("axios");
const jwt = require("jsonwebtoken");
let Util = require("../util");


class OAuthController {
  static async getgithubtoken(ctx) {
    let { clientId, clientSecret, code } = ctx.request.body;
    var tokenResponse = await axios({
      method: "post",
      url: "https://github.com/login/oauth/access_token?" +
        `client_id=${clientId}&` +
        `client_secret=${clientSecret}&` +
        `code=${code}`,
      headers: {
        accept: "application/json"
      }
    })
    let accessToken = tokenResponse.data.access_token;
    // if (toString.call(accessToken) === '[object Undefined]') {
    //   ctx.response.type = "json";
    //   ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Fail, tokenResponse.data.error_description, {});
    //   ctx.response.status = 401;
    // } else {
    //   var result = await axios({
    //     method: "get",
    //     url: `https://api.github.com/user`,
    //     headers: {
    //       accept: "application/json",
    //       Authorization: `token ${accessToken}`
    //     }
    //   });
    //   let token = jwt.sign(result.data, "jwt_token", { expiresIn: "1h" });
    //   ctx.response.type = "json";
    //   ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, 'get github token success.', {
    //     profileInfo: result.data,
    //     accessToken: token
    //   });
    //   ctx.response.status = 200;
    // }
    var result = await axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: {
        accept: "application/json",
        Authorization: `token ${accessToken}`
      }
    });
    let token = jwt.sign(result.data, "jwt_token", { expiresIn: "1h" });
    ctx.response.type = "json";
    ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, 'get github token success.', {
      profileInfo: result.data,
      accessToken: token
    });
    ctx.response.status = 200;
  }
}

module.exports = OAuthController;