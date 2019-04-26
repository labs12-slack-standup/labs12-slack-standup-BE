const uuidv4 = require('uuidv4');
const moment = require('moment');
const faker = require('faker');

// exports.seed = function(knex) {
// 	const reportSeeds = num => {
// 		const reports = [];
// 		for (let i = 0; i < num; i++) {
// 			reports.push({
// 				userId: 1,
// 				reportTypeId: 1,
// 				reportName: 'Daily Standup',
// 				created_at: moment().format(),
// 				schedule: JSON.stringify([
// 					'Monday',
// 					'Tuesday',
// 					'Wednesday',
// 					'Thursday',
// 					'Friday',
// 					'Saturday',
// 					'Sunday'
// 				]),
// 				scheduleTime: moment().format(),
// 				reoccurring: '1week',
// 				message: 'Please fill out the report',
// 				reminder: true,
// 				responseTimeLimit: 600
// 			});
// 		}
// 		return reports;
// 	};
// 	return knex('reports').insert(reportSeeds(100));
// };

exports.seed = function(knex) {
	return knex('reports').insert([
		{
			userId: 1,
			reportTypeId: 1,
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
			reminder: true,
			responseTimeLimit: 600
		},
		{
			userId: 2,
			reportTypeId: 1,
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
			reminder: true,
			responseTimeLimit: 600
		},
		{
			userId: 3,
			reportTypeId: 1,
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
			reminder: true,
			responseTimeLimit: 600
		},
		{
			userId: 4,
			reportTypeId: 1,
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
			reminder: true,
			responseTimeLimit: 600
		},
		{
			userId: 5,
			reportTypeId: 1,
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
			reminder: true,
			responseTimeLimit: 600
		},
		{
			userId: 6,
			reportTypeId: 1,
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
			reminder: true,
			responseTimeLimit: 600
		},
		{
			userId: 7,
			reportTypeId: 1,
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
			reminder: true,
			responseTimeLimit: 600
		},
		{
			userId: 8,
			reportTypeId: 1,
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
			reminder: true,
			responseTimeLimit: 600
		}
	]);
};
