const express = require("express");
const router = express.Router();

const verifyToken = require("../Middlewares/JwtVerificationMiddleware.js");

// Profile route accessible only to authenticated users
router.get("/profile", verifyToken, (req, res) => {
  const userId = req.user.userId; // Adjust the property based on your JWT payload

  res.status(200).json({ message: "Profile route accessed", userId });
});

module.exports = router;
