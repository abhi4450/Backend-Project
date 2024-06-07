const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");

router.get("/users", userController.getUsers);
router.post("/user/assign", userController.assignUserToAstrologer);

module.exports = router;
