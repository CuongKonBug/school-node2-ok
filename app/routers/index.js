const testRouter = require("./home");
const postRouter = require("./post");
const userRouter = require("./user");
const informRouter = require("./inform");
const commentRouter = require("./comment");
const typeInformRouter = require("./typeInform");
const passport = require("../middleware/middlePassport");

function router(app) {
  app.use("/comment", commentRouter);
  app.use("/post", postRouter);
  app.use("/inform", informRouter);
  app.use("/typeInform", typeInformRouter);
  app.use("/user", userRouter);
  app.use("/", testRouter);
  app.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  app.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",

      successRedirect: "/",
      failureFlash: true,
    })
  );
}

module.exports = router;