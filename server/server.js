import express from "express";
import { config } from "dotenv";
import cors from "cors";

config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
	console.log(`Server is running on localhost:${PORT}`);
});
