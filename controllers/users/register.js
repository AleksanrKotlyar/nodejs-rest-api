const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const { sendEmail } = require("../../helpers");
const { Conflict } = require("http-errors");
const { User } = require("../../models");

const register = async (req, res) => {
	const { email, password, subscription } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw new Conflict(`Email ${email} in use already`);
	}

	const hashPassword = bcrypt.hashSync(
		password,
		bcrypt.genSaltSync(10),
		function (err) {
			throw new Error(`Something went wrong, try again because of ${err}`);
		}
	);
	const avatarURL = gravatar.url(email);

	const verificationToken = uuidv4();

	const result = await User.create({
		email,
		password: hashPassword,
		subscription,
		avatarURL,
		verificationToken,
	});

	const mail = {
		to: email,
		subject: "Подтверждение регистрации",
		text: "Перейти по ссылке для подтверждения email",
		html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Перейти по ссылке для подтверждения email</a>`,
	};
	await sendEmail(mail);

	res.status(200).json({
		status: "success",
		code: 201,
		user: {
			email,
			subscription: result.subscription,
			avatarURL,
		},
	});
};

module.exports = register;
