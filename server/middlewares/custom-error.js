import { CustomError } from "../model/Error.js";

const errorMessage = (err, req, res, next) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).json({ message: err.message });
	}

	return res.status(500).json({ message: "Interna Server error. Try again." });
};

export default errorMessage;
