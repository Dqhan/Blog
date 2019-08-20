const express = require("express");
const mongoose = require("mongoose");
const config = require("../../config/config");
const bodyParser = require("body-parser");
const busboy = require("connect-busboy");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const jwt = require('jsonwebtoken');

const app = new express();

app.use(busboy());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("express_react_cookie"));
app.use(
  session({
    secret: "express_react_cookie",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 30 },
    rolling: true,
    store: new MongoStore({
      url: "mongodb://127.0.0.1:27017/blog",
      collection: "sessions"
    })
  })
);

// app.use((req, res, next) => {
//   return next().catch(err => {
//     if (err.status === 401) {
//       res.status = 401;

//     } else {
//       throw new err;
//     }
//   });
// });

// app.use(koajwt({
// 	secret: 'my_token'
// }).unless({
// 	path: [/\/user\/login/]
// }));

app.use("/article", require("./article"));
app.use("/leavemessage", require("./leavemessage"));
app.use("/about", require("./about"));
app.use("/user", require("./user"));
app.use("/document", require("./document"));
app.use("/oauth", require("./oauth"));

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, function(
  err
) {
  if (err) {
    console.log(err, "数据库连接失败");
    return;
  }
  console.log("数据库连接成功");

  app.listen(3030, () => console.log("Example app listening on port 3030!"));
});
