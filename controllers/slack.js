const router = require('express').Router();
const axios = require('axios');
const qs = require('qs');
const Users = require('../models/Users');
const confirmation = require('../middleware/slackComponents/slackConfirmation');
const authenticate = require('../middleware/authenticate');

const {
	slackVerification
} = require('../middleware/slackComponents/slackMiddleware');

const apiUrl = 'https://slack.com/api';

// const payload = qs.stringify({
//   client_id: process.env.SLACK_CLIENT_ID,
//   client_secret: process.env.SLACK_CLIENT_SECRET,
//   code: req.query.code,
//   redirect_uri: process.env.SLACK_REDIRECT_URI
// })

// This is the endpoint that returns the list of channels available for a user
// this endpoint is requested when a user wants to create a new reports, on ComponentDidMount.
router.get('/channels', authenticate, async (req, res, next) => {
	try {
		// We need to construct a url with the users slackToken appended as a query param
		const token = req.decodedJwt.slackToken;
		console.log(token);
		const endpoint = `https://slack.com/api/conversations.list?token=${token}`;
		const { data } = await axios.get(endpoint);
		console.log(data);
		// If the response is successful the data object contains a channels array
		// There are more properties in each channel object but we're only taking what's needed.
		const channels = data.channels.map(channel => ({
			id: channel.id,
			name: channel.name
		}));
		res.status(200).json(channels);
	} catch (err) {
		console.log(err);
	}
});

router.post('/sendReport', slackVerification, async (req, res) => {
	const payload = JSON.parse(req.body.payload);
	console.log(payload);
	const { type, user, submission } = payload;
	const value = JSON.parse(payload.actions[0].value);
	//console.log(value);
	const questions = JSON.parse(value.questions);
	//console.log(questions);
	const elements = questions.map((question, index) => {
		let object = {
			label: question,
			type: 'textarea',
			name: index,
			value: payload.message.text
		};
		return object;
	});
	//console.log(elements);

	const slackUserId = user.id;
	const { id, fullName } = await Users.findBySlackId(slackUserId);
	if (type === 'block_actions') {
		//console.log('am I an action?');
		// Get user info of the person who posted the original message from the payload
		try {
			openDialog(payload, fullName, value, elements);
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Something went wrong while getting the questions.' });
		}
	} else if (type === 'dialog_submission') {
		console.log('got here');
		console.log(payload);
		console.log(id);

		// immediately respond with a empty 200 response to let
		// Slack know the command was received
		res.send('');
		// DM the user a confirmation message
		confirmation.sendConfirmation(user.id, submission, questions);
	}
});

// open the dialog by calling dialogs.open method and sending the payload
const openDialog = async (payload, real_name, value, elements) => {
	const dialogData = {
		token: process.env.SLACK_ACCESS_TOKEN,
		trigger_id: payload.trigger_id,
		dialog: JSON.stringify({
			title: value.reportName,
			callback_id: 'report',
			submit_label: 'report',
			elements: [
				...elements,
				{
					label: 'Posted by',
					type: 'text',
					name: 'send_by',
					value: `${real_name}`
				}
			]
		})
	};

	// open the dialog by calling dialogs.open method and sending the payload
	const promise = await axios.post(
		`${apiUrl}/dialog.open`,
		qs.stringify(dialogData)
	);
	//console.log(promise);
	return promise;
};

module.exports = router;
