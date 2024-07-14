const User = require("../schemas/userModel");
const {
  ResponseStatusCodes,
} = require("../util/constants/responseStatusCodes");
const { ResponseCommonMessages } = require("../util/constants/commonErrors");

exports.addUser = async (req, res) => {
  const { email, location } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({ email, location });
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res
      .status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR,
      });
  }
};

exports.updateLocation = async (req, res) => {
  const { location } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.location = location;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res
      .status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR,
      });
  }
};


exports.getUserData = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData.length) {
      return res
        .status(404)
        .json({ msg: "No user data found" });
    }
    res.json(userData);
  } catch (err) {
    console.error(err.message);
    return res
      .status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR,
      });
  }
};