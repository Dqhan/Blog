const express = require("express");
const mongoose = require("mongoose");
const config = require("../../config/config");
const bodyParser = require("body-parser");
const busboy = require("connect-busboy");
const expressjwt = require("express-jwt");
let util = require("../util");
const app = new express();

app.use(busboy());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  expressjwt({
    secret: "my_token",
    credentialsRequired: true, //如果false  则authoriaztion为空时也通过。
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        var token = req.headers.authorization.split(" ")[1];
        return token;
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
  }).unless({
    path: util.whiteList
  })
);

function checkPromisition(req, res, next) {
  if (1) {
    return next();
  } else {
    util.responseClient(res, 500, 0, "delete github token failed.", {
      log: "delete github token failed with http code 401."
    });
  }
}

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    util.responseClient(res, 403, 0, "invalid token...", {});
  }
});

app.use("/article", require("./article"));
app.use("/leavemessage", require("./leavemessage"));
app.use("/user", require("./user"));
app.use("/document", require("./document"));
app.use("/oauth", require("./oauth"));

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, function (
  err
) {
  if (err) {
    console.log(err, "数据库连接失败");
    return;
  }
  console.log("数据库连接成功");

  app.listen(3030, () => console.log("Example app listening on port 3030!"));
});
