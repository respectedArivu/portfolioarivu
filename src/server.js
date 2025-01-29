require('dotenv').config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 5000;

// CORS setup for specific origin (adjust as needed)
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// Connect to MongoDB using environment variable (MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// User schema setup
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phoneNumber: String,
  password: String,
  verified: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

// Registration route
app.post("/register", async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  // Validate input data
  if (!username || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    username,
    email,
    phoneNumber,
    password: hashedPassword,
  });

  await newUser.save();

  // Sending email for verification
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,  // Use environment variable for email
      pass: process.env.EMAIL_PASS,  // Use environment variable for password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Please verify your email address",
    text: `Hello ${username},\n\nPlease verify your account by clicking the link below:\n\nhttp://localhost:5000/verify/${newUser._id}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error sending verification email" });
    }
    res.status(200).json({ message: "Registration successful! Please verify your account." });
  });
});

// Verify user route
app.get("/verify/:id", async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.verified = true;
  await user.save();

  res.send("Your email has been verified successfully. You can now log in.");
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Check if user is verified
  if (!user.verified) {
    return res.status(400).json({ message: "Please verify your email first" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,  // Use JWT secret from environment variable
    { expiresIn: "1h" } // Token expires in 1 hour
  );

  res.status(200).json({ message: "Login successful", token });
});

// Server listening
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
