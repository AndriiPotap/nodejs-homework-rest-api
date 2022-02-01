const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new NotFound(`contact with id=${id} not found`);
  }
  res.status(200).json(contact);
};

module.exports = getContactById;
