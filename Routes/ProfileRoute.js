const express = require("express");
const router = express.Router();

const verifyToken = require("../Middlewares/JwtVerificationMiddleware.js");

// Profile route accessible only to authenticated users
router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({ message: "Profile route accessed" });
});

module.exports = router;
