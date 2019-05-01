const router = require('express').Router();
const Reports = require('../models/Reports');

// Get all reports
router.get('/', async (req, res) => {
	const { teamId } = req.decodedJwt;
	try {
		const reports = await Reports.findByTeam(teamId);
		if (reports.length === 0) {
			let message =
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
				'Sorry but something went wrong while retrieving the list of reports'
		});

		//sentry call
		throw new Error(error);
	}
});

router.get('/:reportId', async (req, res) => {
	const { reportId } = req.params;
	const { teamId } = req.decodedJwt;
	console.log(reportId, teamId);
	try {
		const report = await Reports.findById(reportId, teamId);
		console.log(report);
		if (report) {
			const message =
				'The reports were found in the database.';
			res.status(200).json({ message, report: { ...report, questions: JSON.parse(report.questions) } });
		} else {
			let message =
				'No report was found in the database';
			res.status(404).json({ message });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message:
				'Sorry but something went wrong while retrieving the list of reports'
		});

		//sentry call
		throw new Error(error);
	}
});

// Add a report
router.post('/', async (req, res) => {
	const body = req.body;
	const { teamId } = req.decodedToken;
	try {
		const report = await Reports.add(req.body);
		res.status(201).json(report);
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry, something went wrong while deleting the report'
		});

		//sentry call
		throw new Error(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const count = await Reports.remove(id);
		if (count === 0) {
			const message = "This report doesn't exist.";
			res.status(404).json({ message });
		} else {
			const message = 'The report was successfully deleted.';
			res.status(202).json({ message });
		}
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry, something went wrong while deleting the report'
		});

		//sentry call
		throw new Error(error);
	}
});

//edit later to pull out specific edit fields from the req.body
router.put('/:reportId', async (req, res) => {
	try {
		const { reportId } = req.params;
		const editedReport = await Reports.update(reportId, req.body);
		if (editedReport) {
			res.status(200).json({
				message: 'The report was edited succesfully.',
				editedReport
			});
		} else {
			res.status(404).json({
				message: 'The report is not found'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message:
				'Sorry, something went wrong while updating the report'
		});
		throw new Error(error);
	}
});

module.exports = router;
