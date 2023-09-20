const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/userSchema");
const app = express();

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body) {
      res.status(400).json({ message: "Invalid Details" });
      return;
    }

    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user document to the database
    const savedUser = await newUser.save();

    // Respond with a success message or user data
    res
      .status(201)
      .json({ message: "Registration successful", user: savedUser });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;
