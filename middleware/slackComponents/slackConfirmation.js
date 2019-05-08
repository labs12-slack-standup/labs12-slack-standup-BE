'use strict';

const axios = require('axios');
const qs = require('qs');

const apiUrl = 'https://slack.com/api';

/*
 *  Send confirmation via chat.postMessage to the user who clipped it
 */

// Currently, Actions + DM combo has known issue when you're using the workspace tokens
// DM works for the user installed the app, and only after other user manually add the app
// We are still investing the issue

const sendConfirmation = (userId, data, questions) => {
	const fields = questions.map((question, index) => {
		let object = {
			title: question,
			value: data[index]
		};
		return object;
	});
	let attachments = [
		{
			title: 'Report was submitted successfully!',
			title_link: ``,
			fields: [
				...fields,
				{
					title: 'Posted by',
					value: data.send_by,
					short: true
				}
			]
		}
	];

	let message = {
		token: process.env.SLACK_ACCESS_TOKEN,
		channel: userId,
		as_user: true,
		attachments: JSON.stringify(attachments)
	};

	axios
		.post(`${apiUrl}/chat.postMessage`, qs.stringify(message))
		.then(result => {
			console.log(result.data);
		})
		.catch(err => {
			console.log(err);
		});
};

module.exports = { sendConfirmation };
