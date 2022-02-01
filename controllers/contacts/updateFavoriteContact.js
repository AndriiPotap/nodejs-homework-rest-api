const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateFavoriteContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const updateFavorireContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!updateFavorireContact) {
    throw NotFound();
  }
  res.json({
    message: `Contact with id: ${id} succsessfully updated!`,
    data: updateFavorireContact,
  });
};

module.exports = updateFavoriteContact;
