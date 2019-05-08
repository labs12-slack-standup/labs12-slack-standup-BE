const axios = require('axios');

const url = 'https://slack.com/api/im.open';
const postUrl = 'https://slack.com/api/chat.postMessage';

const headers = {
	'Content-type': 'application/json; charset=utf-8',
	Authorization:
		'Bearer xoxb-607645147937-627717448976-XLeuLJomr3ZDRJF5Wcbt4i4d'
};

const button = async () => {
	try {
		const message = {
			user: 'UJ3NUQFU7',
			include_locale: true,
			return_im: true
		};

		const { data } = await axios.post(url, message, { headers });
		//console.log(data);

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
								value: 'report'
							}
						}
					]
				}
			]
		};

		const responseMessage = await axios.post(postUrl, response, { headers });
		//console.log(responseMessage);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	button
};
