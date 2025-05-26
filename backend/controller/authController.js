const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
const setCookie = (res, token) => {
  return res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
};
exports.signUp = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide the required information",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    const token = signToken(user._id);
    setCookie(res, token);
    res.status(201).json({
      status: "success",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "User cannot be created",
      error: error.message,
    });
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Password doesnot match",
      });
    }
    const token = signToken(user._id);
    setCookie(res, token);
    res.status(200).json({
      status: "success",
      message: "LogIn successfull🏠",
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Login failed",
    });
  }
};
exports.checkAuth = async (req, res, next) => {
  const cookies = req.cookies.token;
  if (cookies) {
    return res.status(200).json({
      status: "success",
      cookies,
    });
  } else {
    return res.status(400).json({
      status: "fail",
      message: "Not logged In",
    });
  }
};
