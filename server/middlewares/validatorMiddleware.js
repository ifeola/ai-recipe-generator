import { body } from "express-validator";

const validatorMiddleware = [
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name cannot be empty. Please provide a name.")
		.escape(),

	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email cannot be empty. Please provide an email.")
		.isEmail()
		.withMessage("Provide a valid email address."),

	body("password")
		.notEmpty()
		.withMessage("Password cannot be empty. Provide a password")
		.isStrongPassword()
		.withMessage("Provide a strong password."),
];

export default validatorMiddleware;
