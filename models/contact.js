const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const contactSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
			minLength: [3, "min length is 3"],
			maxLength: [30, "max length is 30"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Set email for contact"],
			unique: true,
			minLength: [3, "min length is 3"],
			maxLength: [30, "max length is 30"],
			trim: true,
		},
		phone: {
			type: String,
			// match: /^(\d{4}) \d{3}-\d{2}-\d{2}$/,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationErrors);

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email(),
	phone: Joi.string(),
	favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.bool().required(),
});

const schemas = {
	addSchema,
	updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
