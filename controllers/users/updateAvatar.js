const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { path: tempUpload, originalname } = req.file;
	const { _id: id } = req.user;
	const imageName = `${id}_${originalname}`;
	try {
		const resultUpload = path.join(avatarsDir, imageName);
		const img = await jimp.read(tempUpload);
		await img.resize(250, 250).writeAsync(tempUpload);

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
