const express = require("express");
const { authenticate, validation, ctrlWrap, upload, avatarNormalaizer } = require("../../middlewares");
const { joiAuthSchema } = require("../../models");
const {users: ctrl} = require("../../controllers");
 
const router = express.Router();

router.post("/signup", upload.single("avatar"), validation(joiAuthSchema), ctrlWrap(ctrl.signUp));

router.post("/signin", validation(joiAuthSchema), ctrlWrap(ctrl.signIn));

router.get("/logout",authenticate, ctrlWrap(ctrl.logout) );

router.get("/current", authenticate, ctrlWrap(ctrl.current) );

router.patch("/avatars", authenticate, upload.single("avatar"), avatarNormalaizer, ctrlWrap(ctrl.avatar));

router.get("/verify/:verificationToken", ctrlWrap(ctrl.verify) )
module.exports = router;
