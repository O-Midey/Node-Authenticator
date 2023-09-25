const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");

require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create and sign a JWT with a secret key
    const token = jwt.sign({ username: username }, secretKey, {
      expiresIn: "1h", // Token expiration time
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
