import { Router } from "express";
import { register } from "../controllers/auth.js";
import validatorMiddleware from "../middlewares/validatorMiddleware.js";

const router = Router();

router.post("/register", validatorMiddleware, register);

export default router;
