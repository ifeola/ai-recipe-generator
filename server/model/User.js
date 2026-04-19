import db from "../config/db.js";
import bcrypt, { hash } from "bcrypt";

class User {
	// Create a new user

	static async create(email, name, password) {
		const salt = 10;
		const hashed_password = await bcrypt.hash(password, salt);

		const result = await db.query(
			`
      insert into users(email, hashed_password, name)
      values ($1, $2, $3)
      returning id, email, name, created_at
      `,
			[email, hashed_password, name]
		);

		return result.rows[0];
	}

	static async findByEmail(email) {
		const result = await db.query(
			`
      select * from users
      where email = $1
      `,
			[email]
		);
		return result.rows[0];
	}

	static async findById(id) {
		const result = await db.query(
			`
      select
        id, email, name, updated_at, created_at
      from users
      where id = $1 
      `,
			[id]
		);
		return result.rows[0];
	}

	static async update(id, update) {
		const { name, email } = update;

		const result = await db.query(
			`
      update users
      set name = COALESCE($1, name),
          email = COALESCE($2, email)
      where id = $3
      returning id, name, email
      `,
			[name, email, id]
		);

		return result.rows[0];
	}

	static async updatePassword(id, newPassword) {
		const salt = 10;
		const hashed_password = await bcrypt.hash(newPassword, salt);

		const result = await db.query(
			`
        update users
        set hashed_password = $1
        where id = $2
      `,
			[hashed_password, id]
		);

		return result.rows[0];
	}

	static async verifyPassword(password, hashed_password) {
		const isVerified = await bcrypt.compare(password, hashed_password);
		return isVerified;
	}
}

export default User;
