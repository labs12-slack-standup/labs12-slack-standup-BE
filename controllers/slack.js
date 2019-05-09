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
router.get('/channels', async (req, res, next) => {
  try {
    // We need to construct a url with the users slackToken appended as a query param
    const token = req.decodedJwt.slackToken;
    const endpoint = `https://slack.com/api/conversations.list?token=${token}`;
    const { data } = await axios.get(endpoint);
    // If the response is successful and the data object contains a channels array extract the id and name properties and return as json
    if (data.channels) {
      const channels = data.channels.map(channel => ({
        id: channel.id,
        name: channel.name
      }));
      res.status(200).json(channels);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/sendReport', slackVerification, async (req, res) => {
	//console.log('new request');
	const payload = JSON.parse(req.body.payload);
	//console.log(payload);
	const { type, user } = payload;
	//console.log(value);

	const slackUserId = user.id;
	const { id, fullName } = await Users.findBySlackId(slackUserId);
	if (type === 'block_actions') {
		//console.log('am I an action?');
		// Get user info of the person who posted the original message from the payload
		const value = JSON.parse(payload.actions[0].value);

		const questions = JSON.parse(value.questions);
		//console.log(questions);
		const elements = questions.map((question, index) => {
			let object = {
				label: question,
				type: 'textarea',
				name: question,
				value: payload.message.text
			};
			return object;
		});
		//console.log(elements);

		try {
			openDialog(payload, fullName, value, elements);
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Something went wrong while getting the questions.' });
		}
	} else if (type === 'dialog_submission') {
		// immediately respond with a empty 200 response to let
		// Slack know the command was received
		//console.log('got in submission');
		console.log(payload);
		const { submission } = payload;

		const questions = Object.keys(submission).filter(
			item => item !== 'send_by'
		);

		// Revisit, can filter with dynamic user id
		let answers = Object.values(submission);

		answers.splice(answers.length - 1, 1);

		try {
			//console.log('got here');
			res.send('');
			confirmation.sendConfirmation(user.id, answers, questions, submission);

			const responseArr = answers.map((answer, index) => ({
				reportId: payload.state,
				userId: id,
				question: questions[index],
				answer: answer,
				submitted_date: moment().format()
			}));
			console.log(responseArr);
			await Responses.add(responseArr);
			res.status(200);
		} catch (error) {
			console.log(error);
		}

		// DM the user a confirmation message
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
