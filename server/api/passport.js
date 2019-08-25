const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;

passport.use(
  new GithubStrategy(
    {
      clientID: "5f2b3eb585cd289ca088",
      clientSecret: "281abd4850f451b536416ddede3e3a61ccce07fe",
      callbackURL: "http://localhost/api/oauth/github/callback", //第三方应用申请页面填写的回调地址
      passReqToCallback: true //会传输req对象
    },
    function(req, accessToken, refreshToken, profile, done) {
      var a = req;
      var b = accessToken;
      var c = refreshToken;
      var e = done;
      let user = profile;
      return done(null, user);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
