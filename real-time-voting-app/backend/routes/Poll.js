const express = require("express");
const { createPoll, votePoll, getPolls } = require("../controllers/Poll");
const userAuth = require("../middlewares/Auth");

const router = express.Router();

router.post("/polls", userAuth.authenticate, createPoll);
router.post("/polls/:pollId/vote", userAuth.authenticate, votePoll);
router.get("/polls", userAuth.authenticate, getPolls);

module.exports = router;
