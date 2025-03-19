const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret_key"; // Change this to a secure secret

// Sign-up Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Generate a JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Sign-in Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate a JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
