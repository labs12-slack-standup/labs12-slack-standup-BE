exports.up = function(knex) {
	return knex.schema.createTable('reports', tbl => {
		tbl.increments();

		tbl.integer('teamId');

		tbl.string('reportName', 128).notNullable();

		tbl.string('created_at').notNullable();

		tbl.text('schedule');

		tbl.string('scheduleTime');

		tbl.string('reoccurring', 128);

		tbl.text('message');

		tbl.integer('responseTimeLimit');

		tbl.text('questions');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('reports');
};
