const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("./../utils/SendEmail");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
const setCookie = (res, token) => {
  return res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
};
const clearCookie = (res) => {
  return res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
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
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password doesnot match",
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
      message: "User already exists",
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
exports.ensureAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please login to add the rentals",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    res.status(400).json({
      message: "Error occured in verification of token",
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
exports.logout = async (req, res, next) => {
  try {
    clearCookie(res);
    res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(400).json({ message: "Server error" });
  }
};
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        message: "Cannot get information",
      });
    }
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Server error",
      error: error.message,
    });
  }
};
exports.changePassword = async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await User.findById(req.user._id).select("+password");

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: "New password and confirm new password doesnot match",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Current password doesnot match",
      });
    }
    user.password = newPassword;
    user.confirmPassword = confirmNewPassword;
    await user.save();
    res.status(200).json({
      message: "Password changed successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Cannot change password",
    });
  }
};
exports.forgotPassword = async (req, res, next) => {
  const userId = req?.user?._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User doesnot exists",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetToken = hashedToken;
    user.tokenExpiry = Date.now() + 30 * 60 * 1000;
    user.confirmPassword = user.password;
    await user.save();
    sendEmail(user?.email, user?.name, resetToken);
    res.status(200).json({
      message: "Email sent ✅",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot send email! Please try again later",
      error,
    });
  }
};
exports.resetPassword = async (req, res, next) => {
  const { newPassword, confirmNewPassword } = req.body;
  const { token } = req.params;
  try {
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: "Password and confirm password doesnot match",
      });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetToken: hashedToken,
      tokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Token expired or invalid",
      });
    }
    user.password = newPassword;
    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    clearCookie(res);

    await user.save();
    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
};
exports.getAllUsers = async (req, res, next) => {
  const user = await User.find();
  if (!user) {
    return res.status(400).json({
      message: "No user found",
    });
  }
  res.status(200).json({
    status: "success",
    user,
  });
};
