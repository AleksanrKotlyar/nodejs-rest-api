const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { path: tempUpload, originalname } = req.file;
	const { _id: id } = req.user;
	const imageName = `${id}_${originalname}`;
	try {
		const resultUpload = path.join(avatarsDir, imageName);
		fs.rename(tempUpload, resultUpload);
		const avatarURL = path.join("avatars", imageName);
		await User.findByIdAndUpdate(id, { avatarURL });

		res.json({ avatarURL });
	} catch (error) {
		await fs.unlink(tempUpload);
		throw error;
	}
};

module.exports = updateAvatar;
