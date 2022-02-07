const gravatar = require("gravatar");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const {nanoid} = require("nanoid");
const sendEmail = require("../../helpers");
const { SITE_NAME } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email is use!");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email, { s: "250" });
  await User.create({ ...req.body, avatarURL, verificationToken, password: hashPass });
  const mail = {
    to: email,
    subject: "Подтверждение регистрации!",
    html: `
    <a target ="_blank" href="${SITE_NAME}/api/users/verify/${verificationToken}"> Нажмите для подтверждения</a>`
  };
  sendEmail(mail);
  res.status(201).json({
    user: {
      email: email,
      avatarURL: avatarURL,
      subscription: "starter",
    },
  });
};

module.exports = signUp;
