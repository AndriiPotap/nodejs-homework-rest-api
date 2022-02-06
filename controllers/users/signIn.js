const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { SECRET_KEY } = process.env;

const singIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify) {
    throw new Unauthorized("Email or password is wrong, or email not verify!");
  }
  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    throw new Unauthorized("Email or password is wrong!");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token: token,
    user: {
      email: email,
      subscription: "starter",
    },
  });
};

module.exports = singIn;
