const express = require("express");
const router = express.Router();
const typeInformController = require("../controllers/typeInformController");
const middle = require("../middleware/authPermission");
const multer = require("multer");

router.post(
  "/",
  middle.checkAlreadyLogin,
  middle.checkAdmin,
  typeInformController.Inform
);

module.exports = router;
