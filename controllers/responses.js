const router = require('express').Router();
const Responses = require('../models/Responses');
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

// This route will insert responses in the database with a reference to the report id
router.post('/:reportId', async (req, res) => {
	const userId = req.decodedJwt.subject										
	const responseArr = req.body.responses.map(item => ({
		reportId: req.params.reportId,
		userId,														 		// @ Arshak, Erin, Mindy & Mikaela - question resource should not be dependent
		question: item.question, 							// on the request body because the user could change it manually, we will need 
		answer: item.answer,									// to pull the report from the db and compare the questions stringified questions
		submitted_date: moment().format(),		// with the questions from the request body and see if they match, feel free to bring up in standup.
	}));
	try {
		const result = await Responses.add(responseArr);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({
			message:
				'Sorry but something went wrong while posting your responses.'
		});

		throw new Error(error);
	}
})

module.exports = router;
