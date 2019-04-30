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
				'Sorry, but something went wrong while retrieving the list of users'
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
		}
	} catch (error) {
		res.status(500).json({message: 'Sorry, there was an error when updating the user.'})
	}
});

//delete user by ID
router.delete('/', (req, res) => {});

module.exports = router;
