import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import validatorMiddleware from "../middlewares/validatorMiddleware.js";

const router = Router();

router.post("/register", validatorMiddleware, register);
router.post("/login", login);

export default router;
