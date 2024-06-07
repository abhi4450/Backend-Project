const express = require("express");
const router = express.Router();
const astrologerController = require("../controllers/Astrologer");

router.post("/astrologer/toggle-top", astrologerController.toggleTopAstrologer);
router.get("/astrologers", astrologerController.getAstrologers);

module.exports = router;
