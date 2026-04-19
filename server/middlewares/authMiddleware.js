import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../model/Error.js";
import { config } from "dotenv";

config();

const authMiddleware = (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies?.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(new UnauthorizedError());
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = {
			id: decoded.id,
			email: decoded.email,
		};
		next();
	} catch (error) {
		console.log("Auth middleware error", error);
		return next(new UnauthorizedError(401, "Token is not valid."));
	}
};

export default authMiddleware;
