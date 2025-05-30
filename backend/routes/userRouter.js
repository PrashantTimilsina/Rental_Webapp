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
module.exports = router;
