const router = require('express').Router();
const Responses = require('../models/Responses');

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
router.get('/:reportId', async (req, res) => {
	const { reportId } = req.params;
	try {
		const responses = await Responses.findBy({ reportId });
		if (responses.length === 0) {
			res.status(404).json({ Message: 'no responses found' });
		} else {
			res.status(200).json({
				Message: 'Responses found in database',
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

module.exports = router;
