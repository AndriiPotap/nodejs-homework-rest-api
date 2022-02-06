const {Schema, model} = require("mongoose");
const Joi = require("joi");

const authSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: null,
      },
      avatarURL:{
        type: String
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, "Verify token is required"],
      },
}, {versionKey: false, timestamps: true });

const joiAuthSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    avatarURL: Joi.string(),
})

const User = model("user", authSchema)

module.exports = {
    User,
    authSchema,
    joiAuthSchema
};
