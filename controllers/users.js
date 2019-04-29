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

router.get('/byemail', async (req, res) => {
	//need to pull email off of firebase response and figure out where to stick it, headers for now to test
	try {
		const { email } = req.headers;
		const user = await Users.findByEmail(email);
		if (user.length !== 0) {
			const message = 'The user was found in the database.';
			res.status(200).json({ message, user: user[0] });
		} else {
			const noUser =
				'No user with that email exists in the database';
			res.status(404).json({ Message: noUser });
		}
		console.log(user);
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry, but something wen wrong while retrieving the user'
		});
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
