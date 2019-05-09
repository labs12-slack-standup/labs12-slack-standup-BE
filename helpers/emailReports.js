const Reports = require('../models/Reports');
const getDay = require('date-fns/get_day');
const getHours = require('date-fns/get_hours');
const getMinutes = require('date-fns/get_minutes');

const Users = require('../models/Users');
const { button } = require('../middleware/slackComponents/slackButton');

const daysToNumbers = {
	1: 'Monday',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
	6: 'Saturday',
	7: 'Sunday'
};

//Get and filter all reports going out at this time
const filterReports = async () => {
	//Get current date and the day of the week
	let currentDate = new Date();
	const dayOfWeek = daysToNumbers[getDay(currentDate)];

	//Get all reports
	const reports = await Reports.find();

	//Filter all reports to see if it is ready to be sent out
	return reports.filter(report => {
		//Get hours and mins and turn them into integers
		let hours = parseInt(`${report.scheduleTime[0]}${report.scheduleTime[1]}`);
		let minutes = `${report.scheduleTime[3]}${report.scheduleTime[4]}`;

		//Get current hour and minutes from the current date
		const currentHour = getHours(currentDate);
		const currentMin = getMinutes(currentDate);

		//Check to see if the current hour/min matches the hour/min of the report
		const sameHours = hours === currentHour ? true : false;
		const sameMin = minutes === currentMin ? true : false;

		// Check to see if all checks match true
		return report.schedule.includes(dayOfWeek) && sameHours && sameMin;
	});
};

//Setting up the reports to be sent out by slack
const slackReports = async () => {
	try {
		//Get all filtered reports from above function
		const reports = await filterReports();

		//Add users to each report
		const stitchedReports = await Promise.all(
			reports.map(async report => {
				let users = await Users.findByTeam(report.teamId);
				const filteredUsers = users.filter(user => user.slackUserId);

				const newReport = {
					...report,
					users: filteredUsers
				};
				return newReport;
			})
		);
		//Call the slack button function
		await button(stitchedReports);
		return 'The function has successfully ran';
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	slackReports
};

//Steps for sending out reports

// Array of reports to be sent out
// Loop over reports array, for each report find all users
// Slack - For each user send out button
// Web - for each user send out email
