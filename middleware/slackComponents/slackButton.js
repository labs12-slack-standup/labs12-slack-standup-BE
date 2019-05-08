const axios = require('axios');
const Reports = require('../../models/Reports');
const Users = require('../../models/Users');

const url = 'https://slack.com/api/im.open';
const postUrl = 'https://slack.com/api/chat.postMessage';

const headers = {
	'Content-type': 'application/json; charset=utf-8',
	Authorization: `Bearer ${process.env.SLACK_ACCESS_TOKEN}`
};

const button = async teamId => {
	try {
		const [report] = await Reports.findByTeam(teamId);
		//console.log(report);
		const users = await Users.findByTeam(teamId);
		//console.log(users);

		users.map(async user => {
			const message = {
				user: user.slackUserId,
				include_locale: true,
				return_im: true
			};

			const { data } = await axios.post(url, message, { headers });

			const response = {
				channel: data.channel.id,
				attachments: [
					{
						blocks: [
							{
								type: 'section',
								text: {
									type: 'plain_text',
									text: 'Fill out your Daily Standup report!'
								},
								accessory: {
									type: 'button',
									text: {
										type: 'plain_text',
										text: 'Button',
										emoji: true
									},
									value: JSON.stringify(report)
								}
							}
						]
					}
				]
			};

			const responseMessage = await axios.post(postUrl, response, { headers });
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	button
};
