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

	// Find if user already exists
	const userExists = await User.findByEmail(email);
	console.log(userExists);

	if (userExists) {
		return next(new BadRequestError("User already exists."));
	}

	// Hash user password
	const hashedPassword = await User.hashPassword(password);

	// Add user to database
	const newUser = await User.create(email, name, hashedPassword);

	await UserPreferences.upsert(newUser.id, {
		dietary_restrictions: [],
		allergies: [],
		preferred_cuisines: [],
		default_serving: 4,
		measurement_unit: "metric",
	});
	await generateToken(newUser.id, res);

	res.status(201).json({
		success: true,
		message: "User added successfully.",
		user: newUser,
	});
};

const login = async (req, res, next) => {
	const { email, password } = req.body;

	// Check if user exists in database
	const userExists = await User.findByEmail(email);
	if (!userExists.email) {
		return next(new BadRequestError("Please provide a valid credential."));
	}

	// Check if user's passwords match
	const isPasswordValid = await User.verifyPassword(
		password,
		userExists.hashed_password
	);

	if (!isPasswordValid) {
		return next(new BadRequestError("Please provide a valid credential."));
	}

	await generateToken(userExists.id, res);
	res
		.status(200)
		.json({ success: true, message: "User successfully logged in." });
};

const currentUser = async (req, res, next) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return next(new BadRequestError("User not found."));
	}

	res.status(200).json({
		success: true,
		data: { user },
	});
};

const passwordReset = async (req, res, next) => {
	const { email } = req.body;

	// Check if user exists in database
	const user = await User.findByEmail(email);
	if (!user.email) {
		return next(new BadRequestError("Please provide a valid credential."));
	}

	res.status(200).json({
		success: true,
		data: { user },
	});
};

export { register, login };
