exports.up = function(knex) {
	return knex.schema.createTable('reports', tbl => {
		tbl.increments();

		tbl.integer('teamId');

		tbl.string('reportName', 128).notNullable();

		tbl.datetime('created_at', { precision: 2 }).notNullable();

		tbl.text('schedule');

		tbl.datetime('scheduleTime', { precision: 2 });

		tbl.string('recurring', 128);

		tbl.text('message');

		tbl.datetime('responseTimeLimit', { precision: 2 });

		tbl.text('questions');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('reports');
};
