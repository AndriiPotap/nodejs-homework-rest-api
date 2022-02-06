const express = require("express");
const { authenticate, validation, ctrlWrap, upload, avatarNormalaizer } = require("../../middlewares");
const {  joiSchema } = require("../../models");
const {users: ctrl} = require("../../controllers");
 
const router = express.Router();

router.post("/signup", upload.single("avatar"), validation(joiSchema), ctrlWrap(ctrl.signUp));

router.post("/signin", validation(joiSchema), ctrlWrap(ctrl.signIn));

router.get("/logout",authenticate, ctrlWrap(ctrl.logout) );

router.get("/current", authenticate, ctrlWrap(ctrl.current) );

router.patch("/avatars", authenticate, upload.single("avatar"), avatarNormalaizer, ctrlWrap(ctrl.avatar))
module.exports = router;
