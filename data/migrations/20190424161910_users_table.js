exports.up = function(knex) {
	return knex.schema.createTable('users', tbl => {
		tbl.uuid('id').primary();

		tbl.string('email', 128)
			.notNullable()
			.unique();

		tbl.string('password', 128).notNullable();

		tbl.string('created_at').notNullable();

		tbl.string('profilePic');

		tbl.string('roles').notNullable();

		tbl.string('teamId');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users');
};
