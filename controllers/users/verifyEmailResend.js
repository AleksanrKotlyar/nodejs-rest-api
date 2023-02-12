const { User } = require("../../models");
const { BadRequest, NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");

const verifyEmailResend = async (req, res) => {
	const { email } = req.body;
	if (!email) {
		throw new BadRequest("missing required field email");
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new NotFound("User not found");
	}
	if (user.verify) {
		throw new BadRequest("Verification has already been passed");
	}
	const mail = {
		to: email,
		subject: "Подтверждение регистрации",
		text: "Перейти по ссылке для подтверждения email",
		html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Перейти по ссылке для подтверждения email</a>`,
	};
	await sendEmail(mail);

	res.json({
		code: 200,
		status: "success",
		message: "Verification email sent",
	});
};

module.exports = verifyEmailResend;
