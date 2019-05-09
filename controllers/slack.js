const router = require('express').Router();
const axios = require('axios');
const qs = require('qs');
const Users = require('../models/Users');
const Responses = require('../models/Responses');
const moment = require('moment');

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
	const { type, user } = payload;

	const slackUserId = user.id;
	const { id, fullName } = await Users.findBySlackId(slackUserId);

	if (type === 'block_actions') {
		const value = JSON.parse(payload.actions[0].value);

		//pull questions out of the value and put them in an array
		const questions = JSON.parse(value.questions);

		//map through questions and create an interactive element for each
		const elements = questions.map((question, index) => {
			let object = {
				label: question,
				type: 'textarea',
				name: question,
				value: payload.message.text
			};
			return object;
		});

		try {
			//call openDialog to send modal in DM
			openDialog(payload, fullName, value, elements);
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Something went wrong while getting the questions.' });
		}
	} else if (type === 'dialog_submission') {
		console.log(payload);
		const { submission } = payload;

		//Submissions comes in as { question: answer ... send_by: full_name }. This strips out the questions
		const questions = Object.keys(submission).filter(
			item => item !== 'send_by'
		);

		// Revisit, can filter with dynamic user id
		let answers = Object.values(submission);

		answers.splice(answers.length - 1, 1);

		try {
			//immediately respond with an empty 200 response to let slack know command was received
			res.send('');

			//send confirmation of submission back to user
			confirmation.sendConfirmation(user.id, answers, questions, submission);

			//create an array of response objects
			const responseArr = answers.map((answer, index) => ({
				reportId: payload.state,
				userId: id,
				question: questions[index],
				answer: answer,
				submitted_date: moment().format()
			}));

			//insert array of response objects to response table
			await Responses.add(responseArr);

			//not sure we need this
			res.status(200);
		} catch (error) {
			//likely need better error handling
			console.log(error);
		}
	}
});

// open the dialog by calling dialogs.open method and sending the payload
const openDialog = async (payload, real_name, value, elements) => {
	console.log(value.id);
	const dialogData = {
		token: process.env.SLACK_ACCESS_TOKEN,
		trigger_id: payload.trigger_id,
		dialog: JSON.stringify({
			title: value.reportName,
			callback_id: 'report',
			submit_label: 'report',
			state: value.id.toString(),
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
