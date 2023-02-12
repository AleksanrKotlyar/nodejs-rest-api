const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");
const {
	validation,
	controllerWrapper,
	auth,
	upload,
} = require("../../middlewares");
const { schemas } = require("../../models/users");

router.post(
	"/register",
	validation(schemas.joiRegisterSchema),
	controllerWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", controllerWrapper(ctrl.verifyEmail));
router.post(
	"/verify",
	validation(schemas.verifyEmailSchema),
	controllerWrapper(ctrl.verifyEmailResend)
);

router.post(
	"/login",
	validation(schemas.joiLoginSchema),
	controllerWrapper(ctrl.login)
);

router.get(
	"/current",
	controllerWrapper(auth),
	controllerWrapper(ctrl.getCurrent)
);

router.get("/logout", auth, controllerWrapper(ctrl.logout));

router.patch(
	"/",
	auth,
	validation(schemas.joiUpdateSubscriptionSchema),
	controllerWrapper(ctrl.updateSubscription)
);
router.patch(
	"/avatars",
	auth,
	upload.single("avatar"),
	controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;
