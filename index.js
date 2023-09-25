const express = require("express");
const app = express();
const mongoose = require("mongoose");
const registerRoute = require("./Routes/RegisterRoute.js");
const loginRoute = require("./Routes/LoginRoute.js");
const profileRoute = require("./Routes/ProfileRoute.js");

const verifyToken = require("./Middlewares/JwtVerificationMiddleware.js");
require("dotenv").config();
const uri = process.env.DB_URI;
async function main() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB or saving user:", err);
  }
}

main();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", registerRoute);
app.use("/", loginRoute);
app.use("/users", profileRoute);

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
