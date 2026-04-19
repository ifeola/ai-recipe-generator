import db from "../config/db.js";

class UserPreferences {
	static async upsert(userId, preferences) {
		const {
			dietary_restrictions = [],
			allergies = [],
			preferred_cuisines = [],
			default_servings = 4,
			measurement_unit = "metric",
		} = preferences;

		const result = await db.query(
			`
      insert into user_preferences
      (user_id, dietary_restrictions, allergies, preferred_cuisines, default_servings, measurement_unit)
      values ($1, $2, $3, $4, $5, $6)
      on conflict (user_id)
      do update set
        dietary_restrictions = $2,
        allergies = $3,
        preferred_cuisines = $4,
        default_servings = $5,
        measurement_unit = $6
      returning *
      `,
			[
				userId,
				dietary_restrictions,
				allergies,
				preferred_cuisines,
				default_servings,
				measurement_unit,
			]
		);

		return result.rows[0];
	}

	static async get(userId) {
		const result = await db.query(
			`
        select * from user_preferences
        where id = $1
        `,
			[userId]
		);
		return result.rows[0] || null;
	}

	static async delete(userId) {
		await db.query(
			`
        delete from user_preferences
        where id = $1
        `,
			[userId]
		);
	}
}

export default UserPreferences;
