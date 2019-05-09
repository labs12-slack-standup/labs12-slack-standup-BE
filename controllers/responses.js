const router = require('express').Router();
const Responses = require('../models/Responses');
const Reports = require('../models/Reports');
const moment = require('moment');
const dateFns = require('date-fns');

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

// Gets all reponses by report
router.get('/:reportId', async (req, res) => {
	const { reportId } = req.params;
	const { teamId } = req.decodedJwt;
	const startday = dateFns.startOfDay(new Date());
	const endDay = dateFns.endOfDay(new Date());
	try {
		// Run a check in the Reports model to verify that the reportId and TeamId are a match
		// If teamId and reportId don't match with resource error will be thrown
		await Reports.findById(reportId, teamId);
		// reportId and teamId have passed verification check.
		const responses = await Responses.findByAndJoin(reportId, startday, endDay);
		// We need to parse each resource and insert into there own user object

		// Create Members Array
		let membersArray = [];

		// Check if responses are in array
		if (responses.length < 1) {
			return res.status(204).json({
				message: 'There are currently no reponses for this report.'
			});
		}

		// Insert First Resource
		membersArray.push({
			userId: responses[0].userId,
			fullName: responses[0].fullName,
			questions: [
				{
					question: responses[0].question,
					answer: responses[0].answer
				}
			]
		});

		// Start loop from second resource
		for (let i = 1; i < responses.length; i++) {
			const n = membersArray.length - 1;
			// If the fullName of the current resource matches the fullName of the last resource in the
			// membersArray push the questions to the questions property
			if (membersArray[n].fullName === responses[i].fullName) {
				membersArray[n].questions.push({
					question: responses[i].question,
					answer: responses[i].answer
				});
				// If the fullName's do not match insert a new object
			} else {
				membersArray.push({
					userId: responses[i].userId,
					fullName: responses[i].fullName,
					questions: [
						{
							question: responses[i].question,
							answer: responses[i].answer
						}
					]
				});
			}
		}

		if (responses.length === 0) {
			res.status(404).json({ Message: 'no responses found' });
		} else {
			res.status(200).json({
				message: 'Responses found in database',
				membersArray
			});
		}
	} catch (error) {
		console.log(error);
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
		const resource = await Reports.findByIdAndTeamId(reportId, teamId);
		//console.log(resource);
		// Parse the stringified questions and map to array
		const resourceQuestions = JSON.parse(resource.questions);
		//console.log(resourceQuestions);

		// Compare the questions from the resource variable with the questions from
		// the request body, if the questions don't match, the client has attempted
		// to alter them, throw an error
		for (let i = 0; i < req.body.length; i++) {
			const q = req.body[i].question;

			if (!resourceQuestions.includes(q)) {
				throw new Error('Incoming questions failed verification check');
			}
		}
		// All questions have passed verification and can now be inserted to the model
		const responseArr = req.body.map(body => ({
			reportId,
			userId: subject,
			question: body.question,
			answer: body.response,
			submitted_date: moment().format()
		}));

		await Responses.add(responseArr);

		res.status(201).json({
			message: 'Thank you for posting your responses.'
		});
	} catch (error) {
		res.status(500).json({
			message: 'Sorry but something went wrong while posting your responses.'
		});
		throw new Error(error);
	}
});

module.exports = router;
