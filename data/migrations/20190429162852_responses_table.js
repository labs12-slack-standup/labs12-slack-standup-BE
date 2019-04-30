exports.up = function(knex) {
	return knex.schema.createTable('responses', tbl => {
		tbl.increments();

		tbl.integer('reportId', 128)
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('reports')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.integer('userId', 128)
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.string('question', 128).notNullable();

		tbl.string('answer', 128);

		tbl.string('submitted_date').notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('responses');
};
