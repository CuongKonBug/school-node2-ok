const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middle = require("../middleware/authPermission");
const passport = require("../middleware/middlePassport");
const multer = require("multer");
var upload = multer({ dest: "uploads/" });

router.get("/", middle.checkAlreadyLogin, userController.checkUser);

router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
    failureFlash: true,
  })
);

router.post(
  "/",
  middle.checkAlreadyLogin,
  middle.checkAdmin,
  userController.createAcc
);

router.post(
  "/edit",
  middle.checkAlreadyLogin,
  middle.checkAdmin,
  userController.classifyPost
);

router.post("/editinfor", middle.checkAlreadyLogin, userController.editInfor);
router.get("/changeForm", userController.changeForm);
router.post(
  "/editavatar",
  middle.checkAlreadyLogin,
  upload.single("avatar"),
  userController.editAvatar
);

router.get("/logout", userController.logout);
router.get("/changeForm", userController.changeForm);
router.post("/changepassword", middle.checkAlreadyLogin, userController.changePass);

module.exports = router;
