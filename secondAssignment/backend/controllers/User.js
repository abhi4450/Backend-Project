const User = require("../models/User");
const Astrologer = require("../models/Astrologer");

let nextAstrologerIndex = 0;

exports.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.json(users);
};


const mongoose = require('mongoose');

exports.assignUserToAstrologer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name } = req.body;
        const user = new User({ name });
        await user.save({ session });

        const astrologers = await Astrologer.find().session(session);
        let selectedAstrologer = astrologers[0];

        for (let astrologer of astrologers) {
            if (astrologer.isTop && astrologer.currentLoad < selectedAstrologer.currentLoad - 2) {
                selectedAstrologer = astrologer;
            } else if (astrologer.currentLoad < selectedAstrologer.currentLoad) {
                selectedAstrologer = astrologer;
            }
        }

        selectedAstrologer.currentLoad++;
        await selectedAstrologer.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.json({ user: user.name, assignedTo: selectedAstrologer.name });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: 'Server error', error });
    }
};

