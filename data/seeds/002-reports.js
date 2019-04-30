const moment = require('moment');

exports.seed = function(knex) {
	return knex('reports').insert([
		{
			teamId: 1,
			reportName: 'Daily Standup',
			created_at: moment().format(),
			schedule: JSON.stringify([
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday'
			]),
			scheduleTime: moment().format(),
			reoccurring: '1week',
			message: 'Please fill out the report',
			responseTimeLimit: 600,
			questions: JSON.stringify([
				{
					question: 'How do you feel today?'
				},
				{
					question: 'What did you get done today?'
				},
				{
					question:
						'Did you finish your goals for today?'
				},
				{
					question:
						'What will you work on tomorrow?'
				}
			])
		},
		{
			teamId: 2,
			reportName: 'Daily Standup',
			created_at: moment().format(),
			schedule: JSON.stringify([
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday'
			]),
			scheduleTime: moment().format(),
			reoccurring: '1week',
			message: 'Please fill out the report',
			responseTimeLimit: 600,
			questions: JSON.stringify([
				{
					question: 'How do you feel today?'
				},
				{
					question: 'What did you get done today?'
				},
				{
					question:
						'Did you finish your goals for today?'
				},
				{
					question:
						'What will you work on tomorrow?'
				}
			])
		},
		{
			teamId: 3,
			reportName: 'Daily Standup',
			created_at: moment().format(),
			schedule: JSON.stringify([
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday'
			]),
			scheduleTime: moment().format(),
			reoccurring: '1week',
			message: 'Please fill out the report',
			responseTimeLimit: 600,
			questions: JSON.stringify([
				{
					question: 'How do you feel today?'
				},
				{
					question: 'What did you get done today?'
				},
				{
					question:
						'Did you finish your goals for today?'
				},
				{
					question:
						'What will you work on tomorrow?'
				}
			])
		},
		{
			teamId: 4,
			reportName: 'Daily Standup',
			created_at: moment().format(),
			schedule: JSON.stringify([
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday'
			]),
			scheduleTime: moment().format(),
			reoccurring: '1week',
			message: 'Please fill out the report',
			responseTimeLimit: 600,
			questions: JSON.stringify([
				{
					question: 'How do you feel today?'
				},
				{
					question: 'What did you get done today?'
				},
				{
					question:
						'Did you finish your goals for today?'
				},
				{
					question:
						'What will you work on tomorrow?'
				}
			])
		},
		{
			teamId: 5,
			reportName: 'Daily Standup',
			created_at: moment().format(),
			schedule: JSON.stringify([
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday'
			]),
			scheduleTime: moment().format(),
			reoccurring: '1week',
			message: 'Please fill out the report',
			responseTimeLimit: 600,
			questions: JSON.stringify([
				{
					question: 'How do you feel today?'
				},
				{
					question: 'What did you get done today?'
				},
				{
					question:
						'Did you finish your goals for today?'
				},
				{
					question:
						'What will you work on tomorrow?'
				}
			])
		}
	]);
};
