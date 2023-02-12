const { Schema, model } = require("mongoose");
const Joi = require("joi");

// const regEx =
// 	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = Schema(
	{
		password: {
			type: String,
			minlength: 6,
			required: [true, "Set password for user"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		avatarURL: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			default: null,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, "Verify token is required"],
		},
	},
	{ versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().email().required(),
	subscription: Joi.string().valid("starter", "pro", "business"),
	token: Joi.string(),
});

const joiLoginSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().email().required(),
});

const joiUpdateSubscriptionSchema = Joi.object({
	subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verifyEmailSchema = Joi.object({
	email: Joi.string().email().required(),
});

const schemas = {
	joiRegisterSchema,
	joiLoginSchema,
	joiUpdateSubscriptionSchema,
	verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
