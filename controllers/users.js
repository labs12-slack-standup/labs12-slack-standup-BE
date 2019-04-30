const router = require('express').Router();
const Users = require('../models/Users');

router.get('/', async (req, res) => {
	try {
		const users = await Users.find();
		const message = 'The users were found in the database.';
		res.status(200).json({ message, users });
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry but something went wrong while retrieving the list of users'
		});

		throw new Error(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const user = await Users.findById(id);

		res.status(200).json({
			message: 'The user was retrieved successfully',
			user
		});
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry but something went wrong while retrieving the user.'
		});

		throw new Error(error);
	}
});

router.get('/team/:teamId', async (req, res) => {
	const { teamId } = req.params;

	try {
		const users = await Users.findByTeam(teamId);

		res.status(200).json({
			message: `The users for team ${teamId} were found successfully.`,
			users
		});
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry but something went wrong while retrieving the users for this team.'
		});

		throw new Error(error);
	}
});

router.get('/:id/joinCode/:joinCode', async (req, res) => {
	const { id, joinCode } = req.params;

	try {
		const teamId = await Users.findByJoinCode(joinCode);
		const updated = await Users.update(id, { teamId });

		res.status(202).json({
			message: 'The user has successfully joined their team.',
			updated
		});
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry but something went wrong while retrieving the team id for this user.'
		});

		throw new Error(error);
	}
});

module.exports = router;
