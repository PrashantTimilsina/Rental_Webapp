const express = require("express");
const router = express.Router();
const authController = require("./../controller/authController");
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.use("/checkAuth", authController.checkAuth);
router.use(
  "/logout",

  authController.logout
);
router.get(
  "/profile",
  authController.ensureAuthenticated,
  authController.getMe
);
router.post(
  "/changepassword",
  authController.ensureAuthenticated,
  authController.changePassword
);
router.post("/forgotpassword", authController.forgotPassword);
router.post("/resetpassword/:token", authController.resetPassword);
module.exports = router;
