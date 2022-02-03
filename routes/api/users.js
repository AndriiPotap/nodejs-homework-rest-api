const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Conflict, BadRequest, Unauthorized } = require("http-errors");
const { authenticate } = require("../../middlewares");
const { User, joiAuthSchema } = require("../../models");

const router = express.Router();
const { SECRET_KEY } = process.env;

router.post("/signup", async (req, res, next) => {
  try {
    const { error } = joiAuthSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email is use!");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    await User.create({ ...req.body, password: hashPass });
    res.status(201).json({
      "user": {
        "email": email,
        "subscription": "starter",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { error } = joiAuthSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { email, password } = req.body;
    const user = User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Email or password is wrong!");
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
      "token": token,
      "user": {
        "email": email,
        "subscription": "starter",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", authenticate, async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get("/current", authenticate, async (req, res, next) => {
  try {
    const { email } = req.user;
    res.status(200).json({
      "email": email,
      "subscription": "starter",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
