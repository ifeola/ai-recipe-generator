import { NotFoundError } from "../model/Error.js";
import UserPreferences from "../model/UserPreferences.js";
import User from "../model/User.js";

const userProfile = async (req, res, next) => {
	const userId = req.user.id;

	const userPreferences = await UserPreferences.get(userId);
	const user = await User.get(userId);
	if (!user) {
		return next(new NotFoundError("User not found."));
	}

	res.status(200).json({
		success: true,
		data: {
			user,
			preferences: userPreferences,
		},
	});
};

const updateProfile = async (req, res, next) => {
	const { name, email } = req.body;

	const user = await User.update(req.user.id, { name, email });

	if (!preferences) {
		return next(new NotFoundError());
	}

	res.status(201).json({
		success: true,
		message: "Profile updated successfully.",
		data: { user },
	});
};

const updatePreferences = async (req, res, next) => {
	const preferences = await UserPreferences.upsert(req.user.id, req.body);

	if (!preferences) {
		return next(new Error());
	}

	res.status(201).json({
		success: true,
		message: "Preferences updated successfully.",
		data: { preferences },
	});
};
