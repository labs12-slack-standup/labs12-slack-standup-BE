const Reports = require('../models/Reports');
const moment = require('moment-timezone');
const jstz = require('jstz');

const filterReports = () => {
	console.log('running a task every 30 min');
};

module.exports = {
	filterReports
};

//Steps for sending out reports

// Array of reports to be sent out
// Loop over reports array, for each report find all users
// Slack - For each user send out button
// Web - for each user send out email
