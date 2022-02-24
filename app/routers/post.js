const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const middle = require("../middleware/authPermission");
const multer = require("multer");
var upload = multer({ dest: "uploads/" });

router.get("/", middle.checkAlreadyLogin, postController.pagePost);
router.post("/", middle.checkAlreadyLogin, upload.any(), postController.createPost);

router.post("/heart", middle.checkAlreadyLogin, postController.reactPost);
router.patch("/", middle.checkAlreadyLogin, upload.any(), postController.repairPost);
router.delete("/", middle.checkAlreadyLogin, postController.deletePost);

module.exports = router;