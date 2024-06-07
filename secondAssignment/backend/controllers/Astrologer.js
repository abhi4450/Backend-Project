const Astrologer = require("../models/Astrologer");

const getAstrologers = async (req, res) => {
  const astrologers = await Astrologer.find();
  res.json(astrologers);
};

const toggleTopAstrologer = async (req, res) => {
  const { astrologerId, isTop } = req.body;

  console.log("data*****", req.body);
  const astrologer = await Astrologer.findById(astrologerId);
  if (astrologer) {
    astrologer.isTop = isTop;
    await astrologer.save();
    res.json({
      message: `Astrologer ${astrologerId} is now ${
        isTop ? "a top" : "a regular"
      } astrologer`,
    });
  } else {
    res.status(404).json({ message: "Astrologer not found" });
  }
};

module.exports = {
  toggleTopAstrologer,
  getAstrologers,
};
