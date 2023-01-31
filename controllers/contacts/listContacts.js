const { Contact } = require("../../models");

const listContacts = async (req, res) => {
	const { _id } = req.user;
	const { page = 1, limit = 20 } = req.query;
	const skip = (page - 1) * limit;

	const contacts = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
		skip,
		limit: Number(limit),
	}).populate("owner", "id email");

	res.json({
		status: "success",
		code: 200,
		data: {
			result: contacts,
		},
	});
};

module.exports = listContacts;
