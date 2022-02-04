const { User, joiAuthSchema, authSchema } = require("./auth.js");
const {
  Contact,
  joiSchema,
  joiContactUpdateFavoriteSchema,
} = require("./contact.js");

module.exports = {
  User,
  joiAuthSchema,
  authSchema,

  Contact,
  joiSchema,
  joiContactUpdateFavoriteSchema,
};
