const router = require('express').Router();
const Reports = require('../models/Reports');

router.get('/', async (req, res) => {
	try {
		const reports = await Reports.find();
		const message = 'The reports were found in the database.';
		res.status(200).json({ message, reports });
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while retrieving the list of reports'
		});

		throw new Error(error);
	}
});

router.get('/user/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const reports = await Reports.findByUserId(id);
		if (reports.length === 0) {
			const message =
				'No reports by that user were found in the database';
			res.status(404).json({ message });
		} else {
			const message =
				'The reports were found in the database.';
			res.status(200).json({ message, reports });
		}
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while retrieving the list of reports'
		});

		//sentry call
		throw new Error(error);
	}
});

module.exports = router;
