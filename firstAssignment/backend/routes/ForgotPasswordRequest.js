const express = require("express");

const router = express.Router();

// const userAuth = require("../middleware/auth");

const forgotPasswordController = require("../controllers/ForgotPassword");

router.get(
  "/user/password/resetpassword/:requestId",
  forgotPasswordController.handleresetPassword
);

router.post(
  "/user/password/forgotpassword",
  forgotPasswordController.handleForgotPassword
);
router.post(
  "/user/password/updatepassword/:requestId",
  forgotPasswordController.updatePassword
);

module.exports = router;
