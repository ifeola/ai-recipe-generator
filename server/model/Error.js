class CustomError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
	}
}

class NotFoundError extends CustomError {
	constructor(message = "Resources not found.", statusCode = 404) {
		super(statusCode, message);
		this.name = "NotFoundError";
	}
}

class BadRequestError extends CustomError {
	constructor(
		message = "The server cannot or will not process the request due to an apparent client error.",
		statusCode = 400
	) {
		super(statusCode, message);
		this.name = "BadRequestError";
	}
}

class ValidationError extends CustomError {
	constructor(
		message = "Validation due to an apparent client error.",
		statusCode = 400
	) {
		super(statusCode, message);
		this.name = "ValidationError";
	}
}

class UnauthorizedError extends CustomError {
	constructor(
		message = "Authentication falied, please try again.",
		statusCode = 401
	) {
		super(statusCode, message);
		this.name = "UnauthorizedError";
	}
}

class ForbiddenError extends CustomError {
	constructor(message = "Forbidden.", statusCode = 403) {
		super(statusCode, message);
		this.name = "ForbiddenError";
	}
}

export {
	CustomError,
	UnauthorizedError,
	ForbiddenError,
	NotFoundError,
	BadRequestError,
};
