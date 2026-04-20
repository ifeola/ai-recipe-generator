import express from "express";
import { config } from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";
import router from "./routes/auth-router.js";

config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", router);

app.listen(PORT, () => {
	console.log(`Server is running on localhost:${PORT}`);
});
