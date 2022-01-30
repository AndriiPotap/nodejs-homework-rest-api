const express = require("express");
const { NotFound, BadRequest } = require("http-errors");
const {
  joiSchema,
  Contact,
  joiContactUpdateFavoriteSchema,
} = require("../../models/index");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.status(200).json(await Contact.find());
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new NotFound(`contact with id=${id} not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = await joiContactUpdateFavoriteSchema.validateAsync(
      req.body
    );
    if (error) {
      throw new BadRequest(error.message);
    }
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
  } catch (error) {
    if (error.message.includes("is required")) {
      error.status = 400;
      error.message = "missing field favorite!";
    }
    if (error.message.includes("Cast to Object failed")) {
      error.status = 404;
    }
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "Success delete",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
