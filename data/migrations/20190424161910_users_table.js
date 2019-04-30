exports.up = function(knex) {
	return knex.schema.createTable('users', tbl => {
		tbl.increments();

		tbl.integer('teamId');

		tbl.string('email', 128)
			.notNullable()
			.unique();

		tbl.string('password', 128);

		tbl.string('fullName', 128);

		tbl.string('roles').notNullable();

		tbl.string('profilePic');

		tbl.string('created_at').notNullable();

		tbl.boolean('active')
			.defaultTo(true)
			.notNullable();
	});
};


exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users');
};
