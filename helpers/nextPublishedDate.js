const { addDays, getDay } = require('date-fns'); 

module.exports = formatNextPublishedDate;

function formatNextPublishedDate(date, schedule) {
	// Check if date and schedule are true if not return;
	if (!date || schedule.length === 0) return;

	// Define full week array 
	const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	// Define index of date argument
	const day = getDay(date);
	
	// Loop through the week array until nextDayPublished is found
	let i = day + 1;
	nextDayPublished = null;

	while (nextDayPublished === null) {	
		// Define day
		const day = week[i];
	
		// If schedule argument includes day then define nextDayPublished,
		if (schedule.includes(day)) {
			nextDayPublished = day
		// else we either increment count or reset count to first index.
		} else if (i >= week.length - 1) {
			i = 0
		} else {
			i ++
		}
	}

	// Now calculate the different betweem today's day and nextDayPublished
	const nextDay = week.indexOf(nextDayPublished);
	const currentDay = day;
	let nextPublishedDate;
	// If nextDay is less than or equal to currentDay then nextPublishedDate is equal to next week
	if (nextDay <= currentDay) {
		nextPublishedDate = addDays(date, (nextDay - currentDay) + 7);
	} else {
		nextPublishedDate = addDays(date, nextDay - currentDay);
	}

	return nextPublishedDate;
}