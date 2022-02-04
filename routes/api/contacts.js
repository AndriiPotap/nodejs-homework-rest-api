const express = require("express");
const {
  joiSchema,
  joiContactUpdateFavoriteSchema,
} = require("../../models");
const ctrl = require("../../controllers/contacts")
const {validation, ctrlWrap, authenticate} = require("../../middlewares");

const router = express.Router();


router.get("/", authenticate, ctrlWrap(ctrl.getAll));

router.get("/:id", ctrlWrap(ctrl.getContactById))

router.post("/", authenticate, validation(joiSchema),ctrlWrap(ctrl.addContact));

router.put("/:id", authenticate, validation(joiSchema), ctrlWrap(ctrl.updateContactById));

router.patch("/:id/favorite", validation(joiContactUpdateFavoriteSchema), ctrlWrap(ctrl.updateFavorireContact));

router.delete("/:id", ctrlWrap(ctrl.removeContactById));

module.exports = router;
