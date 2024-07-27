const express = require("express");
const userAuth = require("../middlewares/Auth");
const router = express.Router();
const commentController = require("../controllers/Comment");

router.post("/comments", userAuth.authenticate, commentController.addComment);
router.get("/comments/:pollId", commentController.getComments);

module.exports = router;
