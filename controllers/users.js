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

module.exports = router;
