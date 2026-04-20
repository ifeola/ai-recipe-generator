import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const generateToken = async (userID, res) => {
	const payload = { id: userID };
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("jwt", token, {
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		sameSite: "strict",
		maxAge: 1000 * 60 * 60 * 24 * 7,
	});

	return token;
};

export default generateToken;
