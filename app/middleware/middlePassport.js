const passport = require("passport");
const User = require("../models/user");
const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, async function (error, user) {
    await user.populate("manageTopic").execPopulate();
    done(error, user);
  });
});

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const iUsername = username;
      const user = await User.findOne({ username: iUsername });

      if (!user) {
        throw new Error();
      }
      const isCorrectPassword = await user.isValidPassword(password);

      if (!isCorrectPassword) {
        throw new Error();
      }
      return done(null, user);
    } catch (error) {
      return done(null, false, {
        message: "Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!",
      });
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://school-node2-ok.herokuapp.com/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log(profile);
        if (profile._json.hd == "student.tdtu.edu.vn") {
          let user = await User.findOne({ authGoogleID: profile.id });
          if (!user) {
            user = new User({
              email: profile.emails[0].value,
              name: profile.displayName,
              authType: "google",
              authGoogleID: profile.id,
              avatar: profile.photos[0].value,
              createdAt: new Date(),
            });
            await user.save();
          }
          return done(null, user);
        } else {
          return done(null, false, {
            message:
              "Chỉ chấp nhận tài khoản sinh viên trường Đại học Tôn Đức Thắng",
          });
        }
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

module.exports = passport;
