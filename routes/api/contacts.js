const express = require("express");
const router = express.Router();

const { contacts: controller } = require("../../controllers");
const {
	validation,
	controllerWrapper,
	isValidId,
	auth,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", auth, controllerWrapper(controller.listContacts));

router.get(
	"/:contactId",
	isValidId,
	controllerWrapper(controller.getContactById)
);

router.post(
	"/",
	auth,
	validation(schemas.addSchema),
	controllerWrapper(controller.addContact)
);

router.delete(
	"/:contactId",
	isValidId,
	controllerWrapper(controller.removeContact)
);

router.put(
	"/:contactId",
	isValidId,
	validation(schemas.addSchema),
	controllerWrapper(controller.updateContact)
);
router.patch(
	"/:contactId/favorite",
	isValidId,
	validation(schemas.updateFavoriteSchema),
	controllerWrapper(controller.updateStatusContact)
);

module.exports = router;
