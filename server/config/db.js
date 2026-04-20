import { config } from "dotenv";
import { Pool } from "pg";

config();
const connectionString = process.env.DB_URL;
const sql = new Pool({
	connectionString,
	ssl: connectionString ? { rejectUnauthorized: false } : false,
});

sql.on("connect", () => {
	console.log("Connected to Neon Postgres Database");
});

sql.on("error", (err) => {
	console.log("Unexpected Database error", err);
	process.exit(-1);
});

export default {
	query: (text, params) => sql.query(text, params),
	sql,
};
