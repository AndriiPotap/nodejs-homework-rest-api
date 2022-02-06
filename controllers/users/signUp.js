const gravatar = require("gravatar");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email is use!");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email, { s: "250" });
  await User.create({ ...req.body, avatarURL, password: hashPass });
  res.status(201).json({
    user: {
      email: email,
      avatarURL: avatarURL,
      subscription: "starter",
    },
  });
};

module.exports = signUp;
