const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


function generateAccessToken(userId) {
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "1hr" });
}

exports.getRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("USER_EMAIL && PASSWORD :", email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid Credentials", success: false });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email is valid but incorrect password",
        success: false,
      });
    }

    const token = generateAccessToken(user._id);

    return res.status(200).json({
      message: "User Logged In Successfully.",
      success: true,
      token: token,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserProfile = async (req, res) => {
  console.log("hello from user Profile");
  try {
    const user = await User.findById(req.user._id).populate(
      "createdPolls votedPolls"
    );
    console.log("users>>>>>>>", user);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
   
    const userId = req.user._id;
    const profilePicturePath = `/uploads/${req.file.filename}`;

   
    await User.findByIdAndUpdate(
      userId,
      { profilePicture: profilePicturePath },
      { new: true }
    );

    res
      .status(200)
      .json({
        message: "Profile picture updated successfully",
        profilePicture: profilePicturePath,
      });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ error: "Failed to update profile picture" });
  }
};
