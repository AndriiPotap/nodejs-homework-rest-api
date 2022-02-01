// const { model } = require("mongoose");
const { Contact } = require("../../models/index");

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = { name, email, phone };
  const result = await Contact.create({ ...newContact, owner: req.user._id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
