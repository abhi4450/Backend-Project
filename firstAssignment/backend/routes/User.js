const express = require("express");

const router = express.Router();

const userAuth = require("../middleware/auth");
const userController = require("../controllers/User");

router.get("/user/signup", userController.getSignupPage);
router.get("/user/login", userController.getLoginPage);
router.get("/user/dashboard", userController.getUserDashboardPage);
router.get("/user/data", userAuth.authenticate, userController.getUsername);

router.post("/user/signup", userController.signupUser);
router.post("/user/login", userController.loginUser);

module.exports = router;
