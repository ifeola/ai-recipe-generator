import { config } from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { Pool } from "pg";

config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DB_URL;
const pool = new Pool({
	connectionString,
	ssl: connectionString ? { rejectUnauthorized: false } : false,
});

async function runMigration() {
	const client = await pool.connect();

	try {
		console.log("Running database migration...");

		// Read the scheman file
		const schemaPath = path.join(__dirname, "config", "schema.sql");
		const schemasql = fs.readFileSync(schemaPath, "utf-8");

		// Execute the schema
		await pool.query(schemasql);

		console.log("Database migration completed successfully.");
	} catch (error) {
		console.log("Migration failed: ", error.message);
		process.exit(1);
	} finally {
		client.release();
		await pool.end();
	}
}

runMigration();
