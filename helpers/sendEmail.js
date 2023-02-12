const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
	try {
		const mail = { ...data, from: "kotlyar.alek@gmail.com" };
		console.log("mail", mail);

		sgMail
			.send(mail)
			.then(() => console.log("Email sent"))
			.catch((er) => console.log(er.message));
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = sendEmail;
