const express = require("express");
const router = express.Router();
const middle = require("../middleware/authPermission");
const homeController = require("../controllers/homeController");

router.get("/", middle.checkAlreadyLogin, homeController.index);
router.get("/login", homeController.login);
router.get("/admin", middle.checkAdmin, homeController.admin);

module.exports = router;
