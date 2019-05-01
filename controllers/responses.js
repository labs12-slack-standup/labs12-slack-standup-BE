const router = require('express').Router();
const Responses = require('../models/Responses');
const Reports = require('../models/Reports');
const moment = require('moment');

router.get('/', async (req, res) => {
	try {
		const responses = await Responses.find();
		const message = 'The responses were found in the database.';
		res.status(200).json({ message, responses });
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry but something went wrong while retrieving the list of responses.'
		});

		throw new Error(error);
	}
});
// gets all reponses by report
router.get('/:reportId', async (req, res) => {
	const { reportId } = req.params;
	try {
		const responses = await Responses.findBy({ reportId });
		if (responses.length === 0) {
			res.status(404).json({ Message: 'no responses found' });
		} else {
			res.status(200).json({
				message: 'Responses found in database',
				responses
			});
		}
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry but something went wrong while retrieving the list of responses by team.'
		});

		throw new Error(error);
	}
});

// This route will insert responses in the database with a reference to the report id
router.post('/:reportId', async (req, res) => {
	const { reportId } = req.params;
	const { subject, teamId } = req.decodedJwt;
	try {
		// Query the db to verify that this team member is verified to insert a
		// resouce for this report.
		const resource = await Reports.findById(reportId, teamId);
		// Parse the stringified questions and map to array
		const resourceQuestions = JSON.parse(resource.questions)
		const questionArr = resourceQuestions.map(q => q.question);
		// Compare the questions from the resource variable with the questions from
		// the request body, if the questions don't match, the client has attempted
		// to alter them, throw an error
		for (let i = 0; i < req.body.length; i++) {
			const q = req.body[i].question
			if (!questionArr.includes(q)) {
				throw new Error('Incoming questions failed verification check');
			}
		}
		// All questions have passed verification and can now be inserted to the model
		const responseArr = req.body.map(body => ({
			reportId,
			userId: subject,
			question: body.question,
			answer: body.response,
			submitted_date: moment().format(),
		}));

		await Responses.add(responseArr);

		res.status(201).json({
			message:
				'Thank you for posting your responses.'
		});
	} catch (err) {
		res.status(500).json({
			message:
				'Sorry but something went wrong while posting your responses.'
		});
		throw new Error(error);
	}
})

module.exports = router;
