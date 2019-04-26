exports.up = function(knex) {
	return knex.schema.createTable('users', tbl => {
		tbl.increments();

		tbl.string('email', 128)
			.notNullable()
			.unique();

		tbl.string('password', 128);

		tbl.string('created_at').notNullable();

		tbl.string('profilePic');

		tbl.string('roles').notNullable();

		tbl.string('teamId').notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users');
};
