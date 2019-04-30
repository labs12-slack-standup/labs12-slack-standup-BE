const router = require('express').Router();
const Users = require('../models/Users');

// Get all users
router.get('/', async (req, res) => {
	try {
		const users = await Users.find();
		const message = 'The users were found in the database.';
		res.status(200).json({ message, users });
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while retrieving the list of users'
		});

		throw new Error(error);
	}
});

// Get user by id
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const user = await Users.findById(id);

		if (user) {
			res.status(200).json({
				message: 'The user was retrieved successfully',
				user
			});
		} else {
			res.status(404).json({
				message:
					'Sorry, the user requested does not exist'
			});
		}
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry but something went wrong while retrieving the user.'
		});

		throw new Error(error);
	}
});

// Get all users for a team by teamId
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

//edit user by ID
//what properties do we want to be editable?
router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { fullName, password, profilePic, active } = req.body;
		if (fullName || password || profilePic || active) {
			const editedUser = await Users.update(id, req.body);
			res.status(200).json({
				message: 'The user was edited succesfully.',
				editedUser
			});
		} else {
			res.status(400).json({
				message:
					'Please include a valid user property to edit.'
			});
		}
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry, there was an error when updating the user.'
		});
		throw new Error(error);
	}
});

//delete user by ID. Not actually sure we'll need this as we may just switch Active to false.
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const user = await Users.findById(id);
		if (user) {
			await Users.remove(id);

			res.status(200).json({
				message:
					'The user has been successfully removed.'
			});
		} else {
			res.status(404).json({
				message: 'Sorry, that user does not exist.'
			});
		}
	} catch (error) {
		res.status(500).json({
			message: 'Sorry, there was an error deleting the user.'
		});
	}
});

module.exports = router;
