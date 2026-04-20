import { matchedData, validationResult } from "express-validator";
import User from "../model/User.js";
import UserPreferences from "../model/UserPreferences.js";
import { BadRequestError } from "../model/Error.js";
import generateToken from "../utils/generateToken.js";

const register = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array() });
	}

	const { name, email, password } = matchedData(req);
	console.log(password);

	// Find if user already exists
	const userExists = await User.findByEmail(email);

	if (userExists != null) {
		return next(new BadRequestError("User already exists."));
	}

	// Hash user password
	const hashedPassword = await User.hashPassword(password);

	// Add user to database
	const newUser = await User.create(email, name, hashedPassword);
	console.log(newUser);
	await UserPreferences.upsert(newUser.id, {
		dietary_restrictions: [],
		allergies: [],
		preferred_cuisines: [],
		default_serving: 4,
		measurement_unit: "metric",
	});
	await generateToken(newUser.id, res);

	res.status(200).json({
		success: true,
		message: "User added successfully.",
		user: newUser,
	});
};

export { register };
