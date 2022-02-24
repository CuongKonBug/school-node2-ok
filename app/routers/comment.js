const express = require("express");
const router = express.Router();
const middle = require("../middleware/authPermission");
const commentController = require("../controllers/commentController");

router.post("/", middle.checkAlreadyLogin, commentController.comment);
router.delete("/", middle.checkAlreadyLogin, commentController.deleteComment);

module.exports = router;
