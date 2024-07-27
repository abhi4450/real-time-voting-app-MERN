const express = require("express");

const router = express.Router();

const userController = require("../controllers/User");
const userAuth = require("../middlewares/Auth");

const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post("/register", userController.getRegister);
router.post("/login", userController.verifyUser);
router.get("/profile", userAuth.authenticate, userController.getUserProfile);
router.post(
  "/uploadProfilePicture",
  upload.single("profilePicture"),
  userAuth.authenticate,
  userController.uploadProfilePicture
);

module.exports = router;
