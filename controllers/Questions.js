const router = require('express').Router();
const Questions = require('../models/Questions');

router.get('/', async (req, res) => {
	try {
		const questions = await Questions.find();
		const message = 'The questions were found in the database.';
		res.status(200).json({ message, questions });
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while retrieving the list of questions'
		});

		throw new Error(error);
	}
});

module.exports = router;
