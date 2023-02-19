const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/functions");

const registerUser = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  } else {
    //check if user exists
    const isUserExist = await User.findOne({ email: email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (isUserExist) {
      res.status(400);
      throw new Error("User already exist");
    } else {
      const user = await User.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
      });

      if (user) {
        res.status(200);
        res.json({
          status: true,
          msg: "User registered successfully",
          user_id: user._id,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        res.json({
          status: false,
          msg: "User registration failed",
        });
      }
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  } else {
    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200);
      res.json({
        status: true,
        user: user,
        token: generateToken(user._id),
      });
    } else {
      throw new Error("Invalid credentials");
    }
  }
});

const getMe = asyncHandler(async (req, res) => {
  const profile = await User.findById(req.user.id).select("-password");

  res.status(200);
  res.json({
    profile,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
