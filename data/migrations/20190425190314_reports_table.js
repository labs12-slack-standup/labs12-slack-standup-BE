exports.up = function(knex) {
	return knex.schema.createTable('reports', tbl => {
		tbl.increments();

		tbl.integer('userId', 128)
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.integer('reportTypeId').notNullable();

		tbl.string('reportName', 128);

		tbl.string('created_at').notNullable();

		tbl.text('schedule');

		tbl.string('scheduleTime');

		tbl.string('reoccurring', 128);

		tbl.text('message');

		tbl.boolean('reminder')
			.notNullable()
			.defaultTo(true);

		tbl.integer('responseTimeLimit');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('reports');
};
